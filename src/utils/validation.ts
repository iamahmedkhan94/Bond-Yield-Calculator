import { BondInput } from '../types/bond';

export interface ValidationError {
  field: keyof BondInput;
  message: string;
}

export function validateBondInput(input: Partial<BondInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.faceValue === undefined || input.faceValue <= 0) {
    errors.push({ field: 'faceValue', message: 'Face value must be greater than 0' });
  }

  if (input.annualCouponRate === undefined || input.annualCouponRate < 0 || input.annualCouponRate > 100) {
    errors.push({ field: 'annualCouponRate', message: 'Coupon rate must be between 0 and 100' });
  }

  if (input.marketPrice === undefined || input.marketPrice <= 0) {
    errors.push({ field: 'marketPrice', message: 'Market price must be greater than 0' });
  }

  if (input.yearsToMaturity === undefined || input.yearsToMaturity <= 0 || !Number.isFinite(input.yearsToMaturity)) {
    errors.push({ field: 'yearsToMaturity', message: 'Years to maturity must be greater than 0' });
  }

  if (!input.couponFrequency) {
    errors.push({ field: 'couponFrequency', message: 'Please select a coupon frequency' });
  }

  return errors;
}

export function isValidNumber(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
}