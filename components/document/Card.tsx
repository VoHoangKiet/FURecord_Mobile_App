import { Icon, Text, View, WingBlank } from "@ant-design/react-native"
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  title: string,
  author: string
}

export const CardComponent: React.FC<CardProps> = (props) => {
  const [likes, setLikes] = useState(2);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);
  return (
    <WingBlank style={styles.card} size="md">
      <View style={styles.cardContent}>
        <TouchableOpacity>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </TouchableOpacity>
        <Text style={styles.cardDescription}>{props.author}</Text>
        <View style={[styles.active, { backgroundColor: 'lightgreen' }]} onPress={handleLike}>
          <Text style={{color: 'green'}}>Active</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#67d075' }]} onPress={handleLike}>
          <Icon name="like" color="green" />
          <Text style={styles.buttonText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'lightyellow' }]} onPress={handleDislike}>
          <Icon name="dislike" color="yellow" />
          <Text style={styles.buttonText}>{dislikes}</Text>
        </TouchableOpacity>
      </View>
    </WingBlank>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  active: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    borderWidth: 0.5,
    width: 50
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
});