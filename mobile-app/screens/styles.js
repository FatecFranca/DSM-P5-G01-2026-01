import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Container padrão
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // azul claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  // Logo
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  // Títulos
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1', // azul escuro
    marginBottom: 20,
    textAlign: 'center',
  },

  // Inputs
  input: {
    width: '90%',
    height: 50,
    borderColor: '#90caf9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000',
  },

  // Botões principais
  button: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Botões secundários
  secondaryButton: {
    backgroundColor: '#64b5f6',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Mensagens
  message: {
    marginTop: 15,
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },

  // Cards do histórico
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90caf9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    width: '90%',
  },
  cardText: {
    fontSize: 16,
    color: '#0d47a1',
    marginBottom: 5,
  },
});
