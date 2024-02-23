import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, Button, Image, ScrollView } from 'react-native';

export default function App() {
  const [color, setColor] = useState('#795548');
  const [crypto, setCrypto] = useState([]);
  const [images, setImage] = useState([{ "id": "6kr", "url": "https://cdn2.thecatapi.com/images/6kr.jpg", "width": 500, "height": 336 }]);

  const handleButtonClick = (color) => {
    setColor(color);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        setCrypto(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      setImage(data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: color }}>
      <StatusBar />
      <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>My First App (FUN APP)</Text>
      </View>
      <View style={{ flex: 0.15, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <Button title="#8a4af3" onPress={() => handleButtonClick('#8a4af3')} color="#8a4af3" />
        <Button title="#ff5722" onPress={() => handleButtonClick('#ff5722')} color="#ff5722" />
        <Button title="#4caf50" onPress={() => handleButtonClick('#4caf50')} color="#4caf50" />
        <Button title="#795548" onPress={() => handleButtonClick('#795548')} color="#795548" />
      </View>
      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
        {images.length > 0 && <Image source={{ uri: images[0].url }} style={{ width: 200, height: 150, borderRadius: 10, overflow: 'hidden' }} />}
      </View>
      <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
        <Button title="Image" onPress={fetchImage} color="#3f51b5" width="100px" />
      </View>
      <ScrollView style={{ flex: 0.15, marginTop: 10 }}>
        <View>
          {crypto.map((data) => (
            <View key={data.id} style={{borderRadius: 5, height: 70, margin:8 ,backgroundColor: data.changePercent24Hr > 0 ? '#8bc34a' : '#f44336', flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>{data.name} :</Text>
              <Text style={{ color: '#fff' }}>$ {parseFloat(data.priceUsd).toFixed(2)}</Text>
              {data.changePercent24Hr > 0 ? <Text style={{color:'#449d48'}}>⬆️ {parseFloat(data.changePercent24Hr).toFixed(2)}%</Text> : <Text style={{color:'#41081b'}}>⬇️ {parseFloat(data.changePercent24Hr).toFixed(2)}%</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
