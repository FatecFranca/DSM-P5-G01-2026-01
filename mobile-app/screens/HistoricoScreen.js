import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { getConsultas } from '../services/api';

export default function HistoricoScreen({ navigation, loggedUser, setLoggedUser }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        if (loggedUser?.id) {
          const data = await getConsultas(loggedUser.id);
          setConsultas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchConsultas();
  }, [loggedUser]);

  const handleLogoff = () => {
    if (setLoggedUser) {
      setLoggedUser(null);
    }
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Data: {new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cardText}>pH: {item.ph}</Text>
      <Text style={styles.cardText}>Cloramina: {item.cloramina}</Text>
      <Text style={styles.cardText}>Turbidez: {item.turbidez}</Text>
      <Text style={styles.cardText}>Resultado: {item.resultado}</Text>
    </View>
  );

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
        <Text style={styles.title}>Histórico de Consultas</Text>

        {consultas.length === 0 ? (
          <Text style={styles.message}>Nenhuma consulta registrada ainda.</Text>
        ) : (
          <FlatList
            data={consultas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 20, paddingBottom: 120 }}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 100 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
