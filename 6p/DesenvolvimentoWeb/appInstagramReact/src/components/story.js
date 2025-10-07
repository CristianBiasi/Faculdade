import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Story({ story }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={story.image}
          style={styles.image}
        />
        {story.hasStory && <View style={styles.storyBorder} />}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  storyBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e1306c',
  },
  username: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});
