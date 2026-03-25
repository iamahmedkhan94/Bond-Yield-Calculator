import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import BondCalculatorScreen from './src/screens/BondCalculatorScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0f11" />
      <BondCalculatorScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0f11',
  },
});

export default App;