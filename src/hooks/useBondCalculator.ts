import { useState, useCallback } from 'react';
import { BondInput, BondCalculation, CouponFrequency } from '../types/bond';
import { calculateBond } from '../services/bondCalculator';
import { validateBondInput, ValidationError } from '../utils/validation';
import {
  DEFAULT_FACE_VALUE,
  DEFAULT_COUPON_RATE,
  DEFAULT_MARKET_PRICE,
  DEFAULT_YEARS_TO_MATURITY,
  DEFAULT_COUPON_FREQUENCY,
} from '../constants/bond';

interface UseBondCalculatorReturn {
  input: BondInput;
  calculation: BondCalculation | null;
  errors: ValidationError[];
  setField: (field: keyof BondInput, value: number | CouponFrequency) => void;
  calculate: () => void;
  reset: () => void;
}

const initialInput: BondInput = {
  faceValue: DEFAULT_FACE_VALUE,
  annualCouponRate: DEFAULT_COUPON_RATE,
  marketPrice: DEFAULT_MARKET_PRICE,
  yearsToMaturity: DEFAULT_YEARS_TO_MATURITY,
  couponFrequency: DEFAULT_COUPON_FREQUENCY,
};

export function useBondCalculator(): UseBondCalculatorReturn {
  const [input, setInput] = useState<BondInput>(initialInput);
  const [calculation, setCalculation] = useState<BondCalculation | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const setField = useCallback(
    (field: keyof BondInput, value: number | CouponFrequency) => {
      setInput(prev => ({ ...prev, [field]: value }));
    },
    [],
  );

  const calculate = useCallback(() => {
    const validationErrors = validateBondInput(input);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setCalculation(null);
      return;
    }

    try {
      const result = calculateBond(input);
      setCalculation(result);
    } catch {
      setErrors([
        { field: 'faceValue', message: 'Calculation error. Please check your inputs.' },
      ]);
      setCalculation(null);
    }
  }, [input]);

  const reset = useCallback(() => {
    setInput(initialInput);
    setCalculation(null);
    setErrors([]);
  }, []);

  return { input, calculation, errors, setField, calculate, reset };
}