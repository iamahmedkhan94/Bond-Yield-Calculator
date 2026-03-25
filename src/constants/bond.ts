import { CouponFrequency } from '../types/bond';

export const COUPON_FREQUENCY_OPTIONS: { label: string; value: CouponFrequency }[] = [
  { label: 'Annual', value: 'annual' },
  { label: 'Semi-Annual', value: 'semi-annual' },
];

export const PERIODS_PER_YEAR: Record<CouponFrequency, number> = {
  annual: 1,
  'semi-annual': 2,
};

export const DEFAULT_FACE_VALUE = 1000;
export const DEFAULT_COUPON_RATE = 5;
export const DEFAULT_MARKET_PRICE = 950;
export const DEFAULT_YEARS_TO_MATURITY = 10;
export const DEFAULT_COUPON_FREQUENCY: CouponFrequency = 'semi-annual';

export const YTM_MAX_ITERATIONS = 1000;
export const YTM_TOLERANCE = 0.0000001;
export const YTM_INITIAL_GUESS = 0.05;