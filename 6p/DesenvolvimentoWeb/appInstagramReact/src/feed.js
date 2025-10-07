import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Titulo from './components/titulo';
import Stories from './components/stories';
import Foto from './components/foto';
import Menu from './components/menu';

export default function Feed() {
  const [activeTab, setActiveTab] = useState('home');

  // Dados mockados dos posts
  const posts = [
    {
      id: 1,
      username: 'Cristian Biasi',
      userAvatar: require('../assets/avatars/eu.jpeg'),
      image: require('../assets/avatars/comosparcas.jpeg'),
      likes: 42,
      caption: 'Foto pro tabalho!',
      comments: 5,
      time: '2h',
    },
    {
      id: 2,
      username: 'Cristian Biasi',
      userAvatar: require('../assets/avatars/eu.jpeg'),
      image: require('../assets/avatars/arado.jpeg'),
      likes: 28,
      caption: 'Momento especial',
      comments: 3,
      time: '4h',
    },
    {
      id: 3,
      username: 'Jovem Tranquilao',
      userAvatar: require('../assets/avatars/tranquilao.jpeg'),
      image: require('../assets/avatars/tranquilao2.jpeg'),
      likes: 156,
      caption: 'De hoje ta pago!',
      comments: 12,
      time: '6h',
    },
    {
      id: 4,
      username: 'Cristian Biasi',
      userAvatar: require('../assets/avatars/eu.jpeg'),
      image: require('../assets/avatars/skin.jpeg'),
      likes: 89,
      caption: 'Participe do sorte de Skin do CS2!',
      comments: 7,
      time: '8h',
    },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Titulo />
      
      <ScrollView style={styles.scrollView}>
        <Stories />
        
        {posts.map((post) => (
          <Foto key={post.id} post={post} />
        ))}
      </ScrollView>
      
      <Menu activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});
