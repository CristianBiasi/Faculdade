import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Story from './story';

export default function Stories() {
  // Dados mockados dos stories
  const stories = [
    {
      id: 1,
      username: 'Cristian Biasi',
      image: require('../../assets/avatars/eu.jpeg'),
      hasStory: true,
    },
    {
      id: 2,
      username: 'Thiago',
      image: require('../../assets/avatars/thiago.jpeg'),
      hasStory: true,
    },
    {
      id: 3,
      username: 'Marcelo',
      image: require('../../assets/avatars/Marcelo.jpeg'),
      hasStory: true,
    },
    {
      id: 4,
      username: 'Matheus',
      image: require('../../assets/avatars/matheus.jpeg'),
      hasStory: true,
    },
    {
      id: 5,
      username: 'Giovani',
      image: require('../../assets/avatars/indiano.jpeg'),
      hasStory: true,
    },
    
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
});
