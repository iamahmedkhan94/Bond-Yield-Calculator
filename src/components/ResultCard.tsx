import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BondResult } from '../types/bond';
import { formatCurrency, formatPercentage } from '../utils/format';

interface ResultCardProps {
  result: BondResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const statusColor =
    result.premiumOrDiscount === 'premium'
      ? '#c6a776'
      : result.premiumOrDiscount === 'discount'
      ? '#e07856'
      : '#6b665f';

  const statusLabel =
    result.premiumOrDiscount === 'premium'
      ? 'Trading at Premium'
      : result.premiumOrDiscount === 'discount'
      ? 'Trading at Discount'
      : 'Trading at Par';

  const metrics = [
    { label: 'Current Yield', value: formatPercentage(result.currentYield, 4) },
    { label: 'Yield to Maturity', value: formatPercentage(result.yieldToMaturity, 4) },
    { label: 'Total Interest Earned', value: formatCurrency(result.totalInterestEarned) },
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analysis Results</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      {/* Metrics */}
      {metrics.map(metric => (
        <View key={metric.label} style={styles.metricRow}>
          <Text style={styles.metricLabel}>{metric.label}</Text>
          <Text style={styles.metricValue}>{metric.value}</Text>
        </View>
      ))}

      {/* Premium/Discount */}
      <View style={styles.metricRowLast}>
        <Text style={styles.metricLabel}>
          {result.premiumOrDiscount === 'par'
            ? 'Par Difference'
            : result.premiumOrDiscount === 'premium'
            ? 'Premium Amount'
            : 'Discount Amount'}
        </Text>
        <Text style={[styles.metricValue, { color: statusColor }]}>
          {result.premiumOrDiscount === 'premium'
            ? '+'
            : result.premiumOrDiscount === 'discount'
            ? '−'
            : ''}
          {formatCurrency(result.premiumDiscountAmount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13161a',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2723',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  headerTitle: {
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: '#8a857e',
    fontFamily: 'monospace',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1d1a',
  },
  metricRowLast: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b665f',
  },
  metricValue: {
    fontSize: 22,
    color: '#e8e4df',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
});

export default ResultCard;