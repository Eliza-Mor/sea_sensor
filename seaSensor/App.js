import { StatusBar } from 'expo-status-bar';
import { Text,TouchableOpacity, View, ImageBackground, Dimensions,Button } from 'react-native';
import tw from 'twrnc';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const windowHeight = Dimensions.get('window').height;

  


const handlePress = async () => {
  const controller = new AbortController();
  const { signal } = controller;

  setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('http://192.168.16.185:9001/servo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position: '90' }),
      signal,
    });
    }

  catch (error) {
    console.error('Error al mover el servomotor:', error);
  }
};
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
            <Text style={tw`text-black text-3xl font-bold text-center`}>PH:<Text style={tw`text-black text-3xl font-semibold text-center`}>{"  "}20</Text></Text>
            <Text style={tw`text-black text-3xl font-bold text-center`}>Temperatura:<Text style={tw`text-black text-3xl font-semibold text-center`}>{"  "}20 °C</Text></Text>
          </View>
        </LinearGradient>
      </View>

      <Button title="Mover servomotor a 90 grados" onPress={handlePress} />


<TouchableOpacity 
  onPressIn={() => {
    console.log("Inicio de la lectura de datos");
  }}
  onPressOut={() => {
    console.log("Fin de la lectura de datos");
  }}
  style={[tw`absolute`, { bottom: windowHeight / 7, left: 180, right: 180 }]}
>
  <View 
    style={[tw`bg-white p-4 rounded-lg shadow-md h-20 flex items-center justify-center`, { width: '150%', right: '160%', backgroundColor: '#90E2F5' }]}
  >
    <FontAwesomeIcon icon={faArrowLeft} size={50} color="#DBA41A"/>
  </View>
</TouchableOpacity>


<TouchableOpacity 
  onPressIn={() => {
    console.log("Inicio de la lectura de datos");
  }}
  onPressOut={() => {
    console.log("Fin de la lectura de datos");
  }}
  style={[tw`absolute`, { bottom: windowHeight / 7, left: 180, right: 180 }]}
>
  <View 
    style={[tw`bg-white p-4 rounded-lg shadow-md h-20 flex items-center justify-center`, { width: '150%', left: '160%', backgroundColor: '#90E2F5' }]}
  >
    <FontAwesomeIcon icon={faArrowRight} size={50} color="#DBA41A"/>
  </View>
</TouchableOpacity>
      </LinearGradient>
      
      <StatusBar style="light" />
    </View>
  );
}
