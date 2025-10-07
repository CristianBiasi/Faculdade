import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

export default function Titulo() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Logo do Instagram */}
        <Image 
          source={require('../../assets/icons/instalogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Ícones do header */}
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../../assets/icons/like.png')} 
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../../assets/icons/directt.png')} 
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
  },
  logo: {
    width: 120,
    height: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
