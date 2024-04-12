import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Bluetooth } from 'expo';

export default function App() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        Bluetooth.requestPermissionAsync()
            .then(({ status }) => {
                if (status === 'granted') {
                    return Bluetooth.getDevicesAsync();
                }
            })
            .then(deviceList => {
                setDevices(deviceList);
            })
            .catch(error => console.error(error));
    }, []);

    const connectToDevice = async (device) => {
        try {
            await Bluetooth.connectAsync(device);
            console.log('Connected to device:', device);
            // Aquí puedes enviar/recibir datos al dispositivo Arduino UNO WiFi
        } catch (error) {
            console.error('Error connecting to device:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Dispositivos disponibles:</Text>
            {devices.map(device => (
                <Button
                    key={device.id}
                    title={device.name}
                    onPress={() => connectToDevice(device)}
                />
            ))}
        </View>
    );
}
