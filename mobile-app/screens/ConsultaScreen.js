import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { createConsulta } from '../services/api';

export default function ConsultaScreen({ navigation, loggedUser, setLoggedUser }) {
  const [ph, setPh] = useState('');
  const [turbidez, setTurbidez] = useState('');
  const [cloramina, setCloramina] = useState('');
  const [message, setMessage] = useState('');

  const handleSalvar = async () => {
    try {
      const consulta = {
        userId: loggedUser?.id,
        ph,
        turbidez,
        cloramina,
      };

      const data = await createConsulta(consulta);

      if (data?.id) {
        setMessage(`Resultado: ${data.resultado}`);
        // limpa os campos
        setPh('');
        setTurbidez('');
        setCloramina('');
      } else {
        setMessage(data.error || 'Erro ao salvar consulta.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao salvar consulta.');
    }
  };

  const handleLogoff = () => {
    if (setLoggedUser) {
      setLoggedUser(null);
    }
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#e3f2fd" />

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#2196f3', fontSize: 16 }}>← Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoff}>
          <Text style={{ color: '#f44336', fontSize: 16 }}>Logoff</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Image source={require('../assets/water-drop.png')} style={styles.logo} />
        <Text style={styles.title}>Nova Consulta</Text>

        <TextInput
          style={styles.input}
          placeholder="pH (0 a 14)"
          placeholderTextColor="#90caf9"
          value={ph}
          onChangeText={setPh}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Cloramina (0 - 4 mg/L)"
          placeholderTextColor="#90caf9"
          value={cloramina}
          onChangeText={setCloramina}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Turbidez (0 - 100 NTU)"
          placeholderTextColor="#90caf9"
          value={turbidez}
          onChangeText={setTurbidez}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar Consulta</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}
