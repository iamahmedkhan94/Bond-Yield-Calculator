import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppSelect from '../components/AppSelect';
import ResultCard from '../components/ResultCard';
import CashFlowTable from '../components/CashFlowTable';
import { useBondCalculator } from '../hooks/useBondCalculator';
import { COUPON_FREQUENCY_OPTIONS } from '../constants/bond';
import { CouponFrequency } from '../types/bond';

const BondCalculatorScreen: React.FC = () => {
  const { input, calculation, errors, setField, calculate, reset } = useBondCalculator();

  const getError = (field: string) =>
    errors.find(e => e.field === field)?.message;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>$</Text>
            <Text style={styles.badgeText}>Fixed Income</Text>
          </View>
          <Text style={styles.title}>Bond Yield{'\n'}Calculator</Text>
          <Text style={styles.subtitle}>
            Analyze yield metrics, premium/discount status, and project the
            complete cash flow schedule.
          </Text>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bond Parameters</Text>

          <View style={styles.inputGrid}>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <AppInput
                  label="Face Value"
                  value={input.faceValue}
                  onChange={v => setField('faceValue', v)}
                  suffix="USD"
                  error={getError('faceValue')}
                />
              </View>
              <View style={styles.inputHalf}>
                <AppInput
                  label="Coupon Rate"
                  value={input.annualCouponRate}
                  onChange={v => setField('annualCouponRate', v)}
                  suffix="%"
                  error={getError('annualCouponRate')}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <AppInput
                  label="Market Price"
                  value={input.marketPrice}
                  onChange={v => setField('marketPrice', v)}
                  suffix="USD"
                  error={getError('marketPrice')}
                />
              </View>
              <View style={styles.inputHalf}>
                <AppInput
                  label="Years to Maturity"
                  value={input.yearsToMaturity}
                  onChange={v => setField('yearsToMaturity', v)}
                  error={getError('yearsToMaturity')}
                />
              </View>
            </View>

            <AppSelect
              label="Coupon Frequency"
              value={input.couponFrequency}
              options={COUPON_FREQUENCY_OPTIONS}
              onChange={v => setField('couponFrequency', v as CouponFrequency)}
              error={getError('couponFrequency')}
            />
          </View>

          <View style={styles.buttonRow}>
            <AppButton
              label="Calculate"
              onPress={calculate}
              variant="primary"
              style={styles.primaryButton}
            />
            <AppButton label="Reset" onPress={reset} variant="secondary" />
          </View>
        </View>

        {/* Results */}
        {calculation && (
          <View style={styles.results}>
            <ResultCard result={calculation.result} />
            <CashFlowTable cashFlows={calculation.cashFlows} />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f11',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(198,167,118,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeIcon: {
    fontSize: 13,
    color: '#c6a776',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: '#c6a776',
    fontFamily: 'monospace',
  },
  title: {
    fontSize: 34,
    color: '#e8e4df',
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b665f',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  card: {
    backgroundColor: '#13161a',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2723',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: '#8a857e',
    fontFamily: 'monospace',
    marginBottom: 18,
  },
  inputGrid: {
    gap: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  primaryButton: {
    flex: 1,
  },
  results: {
    gap: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default BondCalculatorScreen;