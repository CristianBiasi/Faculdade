import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function Menu({ activeTab, onTabPress }) {
  const menuItems = [
    { id: 'home', icon: require('../../assets/icons/home.png'), label: 'Home' },
    { id: 'search', icon: require('../../assets/icons/search.png'), label: 'Busca' },
    { id: 'reels', icon: require('../../assets/icons/mais.png'), label: 'Reels' },
    { id: 'shop', icon: require('../../assets/icons/reels.png'), label: 'Loja' },
    { id: 'profile', icon: require('../../assets/icons/perfil.png'), label: 'Perfil' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => onTabPress(item.id)}
        >
          <Image 
            source={item.icon} 
            style={[
              styles.menuIcon,
              activeTab === item.id && styles.activeIcon
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  activeIcon: {
    tintColor: '#0095f6',
  },
});
