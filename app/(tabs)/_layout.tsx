import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(useColorScheme() ?? 'light');

  const buttons: string[] = [
    'sin', 'cos', 'tan', '√','(',')',',',
    '⌫', '/', '%', 'C',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '^', '=',
  ];

  const handlePress = (value: string) => {
    if (value === '=') {
      try {
        const expression = input
          .replace(/√/g, 'sqrt')
          .replace(/÷/g, '/')
          .replace(/×/g, '*');

        const result = evaluate(expression);
        setInput(String(result));
      } catch {
        setInput('Syntax Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (['sin', 'cos', 'tan', '√'].includes(value)) {
      setInput((prev) => prev + value + '(');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#f2f2f2' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Text style={styles.themeButtonText}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.display, { backgroundColor: isDark ? '#1e1e1e' : '#e2e2e2' }]}>
        <Text style={[styles.displayText, { color: isDark ? '#fff' : '#000' }]}>
          {input || '0'}
        </Text>
      </View>

      <View style={styles.buttonGrid}>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn}
            style={[
              styles.button,
              btn === '=' ? styles.equalsButton : btn === 'C' ? styles.clearButton : null,
              { backgroundColor: isDark ? '#333' : '#dcdcdc' },
            ]}
            onPress={() => handlePress(btn)}
          >
            <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#4a90e2',
  },
  themeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  display: {
    padding: 24,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'flex-end',
    minHeight: 80,
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 36,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    paddingVertical: 18,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  equalsButton: {
    backgroundColor: '#00A86B',
  },
  clearButton: {
    backgroundColor: '#A52A2A',
    width: '46%',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
  },
  
  
});
