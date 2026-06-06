import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'; // aproveite o mesmo esquema de cores

export default function HomeScreen({ navigation, route }) {
  const { loggedUser, setLoggedUser } = route.params || {};

  const handleLogoff = () => {
    if (setLoggedUser) {
      setLoggedUser(null);
    }
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#e3f2fd" />

      <View style={styles.container}>
        {/* Logo centralizada */}
        <Image source={require('../assets/water-drop.png')} style={styles.logo} />

        {/* Título */}
        <Text style={styles.title}>Classificador de Água</Text>

        {/* Mensagem de boas-vindas */}
        {loggedUser ? (
          <Text style={styles.message}>
            Bem-vindo, {loggedUser.name || loggedUser.username || loggedUser.email}!
          </Text>
        ) : null}

        {/* Botão Nova Consulta */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Consulta", { loggedUser, setLoggedUser })}
        >
          <Text style={styles.buttonText}>Nova Consulta</Text>
        </TouchableOpacity>

        {/* Botão Histórico */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Historico", { loggedUser, setLoggedUser })}
        >
          <Text style={styles.secondaryButtonText}>Histórico de Consultas</Text>
        </TouchableOpacity>

        {/* Botão Logoff */}
        <TouchableOpacity
          style={{ marginTop: 30, backgroundColor: '#888', padding: 10, borderRadius: 6 }}
          onPress={handleLogoff}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Logoff</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
