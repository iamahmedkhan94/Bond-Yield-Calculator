import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CashFlowEntry } from '../types/bond';
import { formatCurrency } from '../utils/format';

interface CashFlowTableProps {
  cashFlows: CashFlowEntry[];
}

const PAGE_SIZE = 10;

const CashFlowTable: React.FC<CashFlowTableProps> = ({ cashFlows }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(cashFlows.length / PAGE_SIZE);
  const visibleFlows = cashFlows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cash Flow Schedule</Text>
        <Text style={styles.headerMeta}>{cashFlows.length} periods</Text>
      </View>

      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Column Headers */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, styles.colPeriod]}>#</Text>
            <Text style={[styles.colHeader, styles.colDate]}>Payment Date</Text>
            <Text style={[styles.colHeader, styles.colAmount]}>Coupon</Text>
            <Text style={[styles.colHeader, styles.colAmount]}>Cumulative</Text>
            <Text style={[styles.colHeader, styles.colAmount]}>Principal</Text>
          </View>

          {/* Rows */}
          {visibleFlows.map((cf, idx) => (
            <View
              key={cf.period}
              style={[
                styles.row,
                idx % 2 === 1 && styles.rowAlt,
                idx < visibleFlows.length - 1 && styles.rowBorder,
              ]}
            >
              <Text style={[styles.cellMuted, styles.colPeriod]}>{cf.period}</Text>
              <Text style={[styles.cellText, styles.colDate]}>{cf.paymentDate}</Text>
              <Text style={[styles.cellAccent, styles.colAmount]}>
                {formatCurrency(cf.couponPayment)}
              </Text>
              <Text style={[styles.cellMono, styles.colAmount]}>
                {formatCurrency(cf.cumulativeInterest)}
              </Text>
              <Text style={[styles.cellMono, styles.colAmount]}>
                {formatCurrency(cf.remainingPrincipal)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Pagination */}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            activeOpacity={0.6}
          >
            <Text style={[styles.pageButton, page === 0 && styles.pageButtonDisabled]}>
              ← Prev
            </Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            {page + 1} / {totalPages}
          </Text>

          <TouchableOpacity
            onPress={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            activeOpacity={0.6}
          >
            <Text
              style={[
                styles.pageButton,
                page >= totalPages - 1 && styles.pageButtonDisabled,
              ]}
            >
              Next →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13161a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2723',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2723',
  },
  headerTitle: {
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: '#8a857e',
    fontFamily: 'monospace',
  },
  headerMeta: {
    fontSize: 11,
    color: '#6b665f',
    fontFamily: 'monospace',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#111417',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2723',
    paddingVertical: 10,
  },
  colHeader: {
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#8a857e',
    fontFamily: 'monospace',
    fontWeight: '500',
    paddingHorizontal: 14,
  },
  colPeriod: {
    width: 50,
  },
  colDate: {
    width: 130,
  },
  colAmount: {
    width: 110,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
  },
  rowAlt: {
    backgroundColor: 'rgba(255,255,255,0.012)',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1f1d1a',
  },
  cellMuted: {
    fontSize: 13,
    color: '#6b665f',
    fontFamily: 'monospace',
    paddingHorizontal: 14,
  },
  cellText: {
    fontSize: 13,
    color: '#e8e4df',
    paddingHorizontal: 14,
  },
  cellAccent: {
    fontSize: 13,
    color: '#c6a776',
    fontFamily: 'monospace',
    fontWeight: '500',
    paddingHorizontal: 14,
  },
  cellMono: {
    fontSize: 13,
    color: '#e8e4df',
    fontFamily: 'monospace',
    paddingHorizontal: 14,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2723',
  },
  pageButton: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#c6a776',
    fontFamily: 'monospace',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  pageButtonDisabled: {
    opacity: 0.3,
  },
  pageInfo: {
    fontSize: 11,
    color: '#6b665f',
    fontFamily: 'monospace',
  },
});

export default CashFlowTable;