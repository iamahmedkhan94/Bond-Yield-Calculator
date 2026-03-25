export type CouponFrequency = 'annual' | 'semi-annual';

export interface BondInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export interface BondResult {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  premiumOrDiscount: 'premium' | 'discount' | 'par';
  premiumDiscountAmount: number;
}

export interface CashFlowEntry {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondCalculation {
  result: BondResult;
  cashFlows: CashFlowEntry[];
}