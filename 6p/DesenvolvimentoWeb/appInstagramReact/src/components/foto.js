import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default function Foto({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => {
      setLikes((curr) => (prev ? curr - 1 : curr + 1));
      return !prev;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header da postagem */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={post.userAvatar} style={styles.avatar} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Imagem principal */}
      <Image
        source={post.image}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Ações */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={require('../../assets/icons/like.png')}
              style={[styles.actionIcon, liked && styles.likedIcon]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/comentar.png')}
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/direct.png')}
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/save.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Curtidas */}
      <Text style={styles.likes}>{likes} curtidas</Text>

      {/* Legenda */}
      <View style={styles.caption}>
        <Text style={styles.captionText}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
      </View>

      {/* Comentários */}
      {post.comments > 0 && (
        <TouchableOpacity>
          <Text style={styles.commentsText}>
            Ver todos os {post.comments} comentários
          </Text>
        </TouchableOpacity>
      )}

      {/* Tempo */}
      <Text style={styles.time}>{post.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  moreIcon: {
    fontSize: 20,
    color: '#000',
    fontWeight: "bold"
  },
  postImage: {
    width: screenWidth,
    height: screenWidth * 1.1, // levemente retangular, mais realista
    backgroundColor: '#f0f0f0',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#000',
  },
  likedIcon: {
    tintColor: '#e1306c',
  },
  likes: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  caption: {
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  captionText: {
    fontSize: 13,
    color: '#000',
  },
  captionUsername: {
    fontWeight: '600',
  },
  commentsText: {
    fontSize: 13,
    color: '#999',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  time: {
    fontSize: 11,
    color: '#999',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
});
