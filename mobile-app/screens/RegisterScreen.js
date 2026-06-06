import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        setMessage(data.error || "Erro ao registrar usuário");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão com servidor");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#e3f2fd" />

      {/* Header com botão voltar */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#2196f3', fontSize: 16 }}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('../assets/water-drop.png')} style={styles.logo} resizeMode="contain" />

        {/* Título */}
        <Text style={styles.title}>Registrar Usuário</Text>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#90caf9"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#90caf9"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#90caf9"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Botão */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        {/* Mensagem */}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}
