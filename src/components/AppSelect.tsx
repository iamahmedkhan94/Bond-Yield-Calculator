import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface AppSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({ label, value, options, onChange, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.optionsRow, error ? styles.optionsRowError : null]}>
        {options.map((option, index) => {
          const isActive = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
              activeOpacity={0.7}
              style={[
                styles.option,
                isActive && styles.optionActive,
                index < options.length - 1 && styles.optionBorder,
              ]}
            >
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: '#8a857e',
    fontFamily: 'monospace',
  },
  optionsRow: {
    flexDirection: 'row',
    backgroundColor: '#181c21',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2a2723',
    overflow: 'hidden',
  },
  optionsRowError: {
    borderColor: '#d4564e',
  },
  option: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    backgroundColor: 'rgba(198, 167, 118, 0.12)',
  },
  optionBorder: {
    borderRightWidth: 1,
    borderRightColor: '#2a2723',
  },
  optionText: {
    fontSize: 14,
    color: '#6b665f',
    fontFamily: 'monospace',
  },
  optionTextActive: {
    color: '#c6a776',
    fontWeight: '600',
  },
  error: {
    fontSize: 11,
    color: '#d4564e',
    fontFamily: 'monospace',
  },
});

export default AppSelect;