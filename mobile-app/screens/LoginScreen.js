import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { login } from '../services/api';

export default function LoginScreen({ navigation, route }) {
  const setLoggedUser = route?.params?.setLoggedUser; // seguro

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
  try {
    const data = await login(email, password);

    if (data.user) {
      // Normaliza o nome do usuário
      const displayName = data.user.name || data.user.username || data.user.email;

      setMessage(`Bem-vindo, ${displayName}!`);

      if (setLoggedUser) {
        setLoggedUser({
          ...data.user,
          name: displayName // garante que sempre exista "name"
        });
      }

      navigation.navigate('Home', { loggedUser: { ...data.user, name: displayName }, setLoggedUser });
    } else {
      setMessage(data.error || 'Erro ao logar.');
    }
  } catch (err) {
    console.error(err);
    setMessage('Erro ao tentar logar.');
  }
};


  return (
    <View style={styles.container}>
      <Image source={require('../assets/water-drop.png')} style={styles.logo} />
      <Text style={styles.title}>Classificador de Água</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#90caf9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#90caf9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.secondaryButtonText}>Registrar</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
