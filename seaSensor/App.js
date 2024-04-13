import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Dimensions } from 'react-native';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
//import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://10.10.50.188:3000'); // Reemplaza con la IP de tu servidor


export default function App() {
  const windowHeight = Dimensions.get('window').height;

  const [pH, setPH] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    // Escuchar actualizaciones de sensor desde el servidor
    socket.on('sensorDataUpdate', (data) => {
        const { pH, temperature } = data;
        setPH(pH.toFixed(2)); // Actualizar estado local con los nuevos datos
        setTemperature(temperature.toFixed(2));
    });

    return () => {
        socket.disconnect(); // Desconectar el socket al desmontar el componente
    };
}, []); // Se ejecuta solo una vez al montar el componente


  return (
    <View style={tw`flex-1`}>

      <ImageBackground
        source={require('./assets/SEASENSOR.png')}
        style={[tw`flex-1`, tw`justify-center items-center`]}
      >
      </ImageBackground>

      <LinearGradient
        colors={['transparent', '#0353a4']}
        style={tw`flex-1`}
      >

        <View style={[tw`absolute`, {
          bottom: windowHeight / 2.4,
          left: 40,
          right: 40,
        }]}>
          <LinearGradient
            colors={['rgba(196, 244, 223, 90)', 'transparent']}
            style={tw`p-6 rounded-lg shadow-md`}
          >
            <View style={[tw`h-28`, { width: '100%', flexDirection: 'column', justifyContent: 'space-between' }]}>
              <Text style={tw`text-black text-3xl font-bold text-center`}>
                PH: <Text style={tw`text-black text-3xl font-semibold text-center`}>{pH}</Text>
              </Text>
              <Text style={tw`text-black text-3xl font-bold text-center`}>
                Temperatura: <Text style={tw`text-black text-3xl font-semibold text-center`}>{temperature}°C</Text>
              </Text>

            </View>
          </LinearGradient>
        </View>


        <TouchableOpacity
          onPressIn={() => {
            console.log("Inicio de la lectura de datos");
          }}
          onPressOut={() => {
            console.log("Fin de la lectura de datos");
          }}
          style={[tw`absolute`, { bottom: windowHeight / 4, left: 150, right: 165 }]}
        >
          <View
            style={[tw`bg-white p-4 rounded-lg shadow-md h-15 flex items-center justify-center`, { width: '150%', backgroundColor: '#90E2F5' }]}
          >
            <FontAwesomeIcon icon={faArrowUp} size={40} color="#DBA41A" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => {
            console.log("Inicio de la lectura de datos");
          }}
          onPressOut={() => {
            console.log("Fin de la lectura de datos");
          }}
          style={[tw`absolute`, { bottom: windowHeight / 7, left: 145, right: 170 }]}
        >
          <View
            style={[tw`bg-white p-4 rounded-lg shadow-md h-15 flex items-center justify-center`, { width: '155%', right: '155%', backgroundColor: '#90E2F5' }]}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={40} color="#DBA41A" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => {
            console.log("Inicio de la lectura de datos");
          }}
          onPressOut={() => {
            console.log("Fin de la lectura de datos");
          }}
          style={[tw`absolute`, { bottom: windowHeight / 7, left: 150, right: 165 }]}
        >
          <View
            style={[tw`bg-white p-4 rounded-lg shadow-md h-15 flex items-center justify-center`, { width: '150%', left: '155%', backgroundColor: '#90E2F5' }]}
          >
            <FontAwesomeIcon icon={faArrowRight} size={40} color="#DBA41A" />
          </View>
        </TouchableOpacity>

      </LinearGradient>

      <StatusBar style="light" />
    </View>
  );
}