import { BondInput, BondResult, CashFlowEntry, BondCalculation } from '../types/bond';
import { PERIODS_PER_YEAR, YTM_MAX_ITERATIONS, YTM_TOLERANCE, YTM_INITIAL_GUESS } from '../constants/bond';
import { getPaymentDate } from '../utils/format';

function calculateCurrentYield(annualCouponPayment: number, marketPrice: number): number {
  return annualCouponPayment / marketPrice;
}

function calculateBondPrice(
  faceValue: number,
  couponPerPeriod: number,
  ytmPerPeriod: number,
  totalPeriods: number,
): number {
  if (ytmPerPeriod === 0) {
    return couponPerPeriod * totalPeriods + faceValue;
  }
  const pvCoupons =
    (couponPerPeriod * (1 - Math.pow(1 + ytmPerPeriod, -totalPeriods))) / ytmPerPeriod;
  const pvFace = faceValue / Math.pow(1 + ytmPerPeriod, totalPeriods);
  return pvCoupons + pvFace;
}

function calculateBondPriceDerivative(
  faceValue: number,
  couponPerPeriod: number,
  ytmPerPeriod: number,
  totalPeriods: number,
): number {
  if (Math.abs(ytmPerPeriod) < 1e-12) {
    let sum = 0;
    for (let t = 1; t <= totalPeriods; t++) {
      sum += -t * couponPerPeriod;
    }
    sum += -totalPeriods * faceValue;
    return sum;
  }
  let derivative = 0;
  for (let t = 1; t <= totalPeriods; t++) {
    derivative += (-t * couponPerPeriod) / Math.pow(1 + ytmPerPeriod, t + 1);
  }
  derivative += (-totalPeriods * faceValue) / Math.pow(1 + ytmPerPeriod, totalPeriods + 1);
  return derivative;
}

function calculateYTM(
  faceValue: number,
  couponPerPeriod: number,
  marketPrice: number,
  totalPeriods: number,
  periodsPerYear: number,
): number {
  // Newton-Raphson method
  let guess = YTM_INITIAL_GUESS / periodsPerYear;

  for (let i = 0; i < YTM_MAX_ITERATIONS; i++) {
    const price = calculateBondPrice(faceValue, couponPerPeriod, guess, totalPeriods);
    const diff = price - marketPrice;

    if (Math.abs(diff) < YTM_TOLERANCE) {
      return guess * periodsPerYear;
    }

    const derivative = calculateBondPriceDerivative(faceValue, couponPerPeriod, guess, totalPeriods);

    if (Math.abs(derivative) < 1e-15) break;

    guess = guess - diff / derivative;
  }

  // Fallback: bisection method
  let low = -0.5 / periodsPerYear;
  let high = 2.0 / periodsPerYear;

  for (let i = 0; i < YTM_MAX_ITERATIONS; i++) {
    const mid = (low + high) / 2;
    const price = calculateBondPrice(faceValue, couponPerPeriod, mid, totalPeriods);
    const diff = price - marketPrice;

    if (Math.abs(diff) < YTM_TOLERANCE) {
      return mid * periodsPerYear;
    }

    if (diff > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return ((low + high) / 2) * periodsPerYear;
}

function generateCashFlows(input: BondInput): CashFlowEntry[] {
  const periodsPerYear = PERIODS_PER_YEAR[input.couponFrequency];
  const totalPeriods = input.yearsToMaturity * periodsPerYear;
  const couponPerPeriod =
    (input.faceValue * (input.annualCouponRate / 100)) / periodsPerYear;
  const startDate = new Date();
  const cashFlows: CashFlowEntry[] = [];
  let cumulativeInterest = 0;

  for (let period = 1; period <= totalPeriods; period++) {
    cumulativeInterest += couponPerPeriod;
    cashFlows.push({
      period,
      paymentDate: getPaymentDate(startDate, period, periodsPerYear),
      couponPayment: couponPerPeriod,
      cumulativeInterest,
      remainingPrincipal: input.faceValue,
    });
  }

  return cashFlows;
}

export function calculateBond(input: BondInput): BondCalculation {
  const periodsPerYear = PERIODS_PER_YEAR[input.couponFrequency];
  const totalPeriods = input.yearsToMaturity * periodsPerYear;
  const annualCouponPayment = input.faceValue * (input.annualCouponRate / 100);
  const couponPerPeriod = annualCouponPayment / periodsPerYear;

  const currentYield = calculateCurrentYield(annualCouponPayment, input.marketPrice);
  const yieldToMaturity = calculateYTM(
    input.faceValue,
    couponPerPeriod,
    input.marketPrice,
    totalPeriods,
    periodsPerYear,
  );
  const totalInterestEarned = annualCouponPayment * input.yearsToMaturity;

  const priceDiff = input.marketPrice - input.faceValue;
  let premiumOrDiscount: 'premium' | 'discount' | 'par';
  if (Math.abs(priceDiff) < 0.01) {
    premiumOrDiscount = 'par';
  } else if (priceDiff > 0) {
    premiumOrDiscount = 'premium';
  } else {
    premiumOrDiscount = 'discount';
  }

  const result: BondResult = {
    currentYield,
    yieldToMaturity,
    totalInterestEarned,
    premiumOrDiscount,
    premiumDiscountAmount: Math.abs(priceDiff),
  };

  const cashFlows = generateCashFlows(input);

  return { result, cashFlows };
}