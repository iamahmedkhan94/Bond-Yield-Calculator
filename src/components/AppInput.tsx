import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface AppInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  error?: string;
  placeholder?: string;
}

const AppInput: React.FC<AppInputProps> = ({ label, value, onChange, suffix, error, placeholder }) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    onChange(isNaN(num) ? 0 : num);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
        ]}
      >
        <TextInput
          style={styles.input}
          value={String(value)}
          onChangeText={handleChange}
          keyboardType="decimal-pad"
          placeholder={placeholder}
          placeholderTextColor="#4a4640"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181c21',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2a2723',
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: '#c6a776',
  },
  inputWrapperError: {
    borderColor: '#d4564e',
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: '#e8e4df',
    fontFamily: 'monospace',
  },
  suffix: {
    fontSize: 13,
    color: '#6b665f',
    fontFamily: 'monospace',
    marginLeft: 8,
  },
  error: {
    fontSize: 11,
    color: '#d4564e',
    fontFamily: 'monospace',
  },
});

export default AppInput;