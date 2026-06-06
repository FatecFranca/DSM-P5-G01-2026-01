import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { register } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const data = await register(name, email, password);

      if (data.user && data.user.id) {
        setMessage("Usuário registrado com sucesso!");
        navigation.navigate("Login");
      } else {
        setMessage(data.error || "Usuário e/ou senha incorretos");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão com servidor");
    }
  };

  return (
    <View style={styles.registerContainer}>
      {/* Ícone da gota */}
      <Image source={require('../assets/water-drop.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.registerTitle}>Registrar Usuário</Text>

      <TextInput
        style={styles.registerInput}
        placeholder="Nome"
        placeholderTextColor="#90caf9"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.registerInput}
        placeholder="Email"
        placeholderTextColor="#90caf9"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.registerInput}
        placeholder="Senha"
        placeholderTextColor="#90caf9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
