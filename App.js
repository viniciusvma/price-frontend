import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [tonelada, setTonelada] = useState('');
  const [dolar, setDolar] = useState(null);
  const [totalKg, setTotalKg] = useState(null);

  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const response = await axios.get('https://pricebackend-production.up.railway.app/dolar');
        setDolar(response.data.dolar);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível obter a cotação do dólar.');
      }
    };

    fetchDolar();
  }, []);

  const calcularPreco = async () => {
    if (!tonelada) {
      Alert.alert('Erro', 'Por favor, insira o valor da tonelada.');
      return;
    }

    try {
      const response = await axios.post('https://pricebackend-production.up.railway.app/calculate', {
        tonelada: parseFloat(tonelada),
      });
      setTotalKg(response.data.totalKg);
      setTonelada('');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao calcular o preço. Verifique sua conexão.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Preço EX</Text>

      {dolar !== null && (
        <View style={styles.dolarContainer}>
          <Text style={styles.dolarText}>Cotação do Dólar</Text>
          <Text style={styles.dolarValue}>R$ {dolar.toFixed(2)}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Valor da Tonelada (em dólares)"
        value={tonelada}
        onChangeText={setTonelada}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.calculateButton} onPress={calcularPreco}>
        <Text style={styles.calculateButtonText}>Calcular</Text>
      </TouchableOpacity>

      {totalKg !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Total/KG R$ {totalKg.toFixed(2)}</Text>
        </View>
      )}

      {/* 
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Venda')}
        >
          <Text style={styles.footerText}>Venda</Text>
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
};

const VendaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Venda</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Calculadora de Preço',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Venda"
          component={VendaScreen}
          options={{
            title: 'Tela de Venda',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  dolarContainer: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  dolarText: {
    fontSize: 16,
    color: '#fff',
  },
  dolarValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  calculateButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 30,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultContainer: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
