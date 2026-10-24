// importaciones de react
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// A. Arreglo LOCAL con los cuatro cursos
const CURSOS = [
  { id: '1', nombre: 'React Native', horas: 20, descripcion: 'Desarrollo de aplicaciones móviles.' },
  { id: '2', nombre: 'Diseño Web', horas: 18, descripcion: 'Creación de interfaces para sitios web.' },
  { id: '3', nombre: 'Ofimática', horas: 16, descripcion: 'Uso de documentos, presentaciones y hojas de cálculo.' },
  { id: '4', nombre: 'Marketing Digital', horas: 12, descripcion: 'Estrategias de comunicación digital.' },
];

const Stack = createNativeStackNavigator();

// ---------- Pantalla INICIO ----------
function InicioScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={() => navigation.navigate('Detalle', { curso: item })}
    >
      <Text style={styles.itemTexto}>
        {item.nombre} · {item.horas} horas
      </Text>
      <Text style={styles.flecha}>{'>'}</Text>
    </Pressable>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Catálogo de Cursos</Text>
      <FlatList
        data={CURSOS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// ---------- Pantalla DETALLE ----------
function DetalleScreen({ route }) {
  const { curso } = route.params;

  // C. Estado del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [acepto, setAcepto] = useState(false);

  // D. Validaciones y confirmación
  const confirmar = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (correo.trim() === '' || !correo.includes('@')) {
      Alert.alert('Error', 'Ingrese un correo válido (debe contener @).');
      return;
    }
    if (!acepto) {
      // No se muestra confirmación con el Switch desactivado
      Alert.alert('Atención', 'Debe aceptar las condiciones para continuar.');
      return;
    }
    Alert.alert(
      'Interés confirmado',
      `${nombre.trim()}, tu interés en el curso "${curso.nombre}" fue registrado.`
    );
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.cursoNombre}>{curso.nombre}</Text>
      <Text style={styles.texto}>{curso.horas} horas</Text>
      <Text style={styles.texto}>{curso.descripcion}</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Su nombre"
      />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.fila}>
        <Text style={styles.label}>Acepto condiciones:</Text>
        <Switch value={acepto} onValueChange={setAcepto} />
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPressed]}
        onPress={confirmar}
      >
        <Text style={styles.botonTexto}>Confirmar interés</Text>
      </Pressable>
    </View>
  );
}

// ---------- App con navegación Stack ----------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- E. Estilos ----------
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemPressed: {
    backgroundColor: '#e6eef5',
  },
  itemTexto: {
    fontSize: 16,
  },
  flecha: {
    fontSize: 18,
    color: '#555',
  },
  cursoNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  boton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#1f5c8b',
    alignItems: 'center',
  },
  botonPressed: {
    opacity: 0.7,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});