import { StatusBar } from 'expo-status-bar';
import { Text,TouchableOpacity, View, ImageBackground, Dimensions } from 'react-native';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const windowHeight = Dimensions.get('window').height;


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

      <TouchableOpacity onPress={() => console.log("Botón presionado")} style={[tw`absolute`, { bottom: windowHeight / 4, left: 180, right: 180 }]}>
  <View style={[tw`bg-white p-4 rounded-lg shadow-md h-20 flex items-center justify-center`, { width: '150%', backgroundColor: '#90E2F5' }]}>
    <FontAwesomeIcon icon={faArrowUp} size={40} color="black"/>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => console.log("Botón presionado")} style={[tw`absolute`, { bottom: windowHeight / 7, left: 180, right: 180 }]}>
  <View style={[tw`bg-white p-4 rounded-lg shadow-md h-20 flex items-center justify-center`, { width: '150%', right: '150%', backgroundColor: '#90E2F5' }]}>
    <FontAwesomeIcon icon={faArrowLeft} size={40} color="black"/>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => console.log("Botón presionado")} style={[tw`absolute`, { bottom: windowHeight / 7, left: 180, right: 180 }]}>
  <View style={[tw`bg-white p-4 rounded-lg shadow-md h-20 flex items-center justify-center`, { width: '150%', left: '150%', backgroundColor: '#90E2F5' }]}>
    <FontAwesomeIcon icon={faArrowRight} size={40} color="black"/>
  </View>
</TouchableOpacity>
      </LinearGradient>
      
      <StatusBar style="light" />
    </View>
  );
}
