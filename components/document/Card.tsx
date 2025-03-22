import { Icon, Text, View, WingBlank } from "@ant-design/react-native"
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  id: number,
  title: string,
  author: string,
  state: "active" | "pending",
  likes: number,
  dislikes: number,
  onPress: (id: number) => void,
}

export const CardComponent: React.FC<CardProps> = ({ id, title, author, state, dislikes, likes, onPress }) => {
  return (
    <WingBlank style={styles.card} size="md">
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => onPress(id)}>
          <Text style={styles.cardTitle}>{title}</Text>
        </TouchableOpacity>
        <Text style={styles.cardDescription}>{author}</Text>
        {state === "active" ? (
          <View style={[styles.active, { backgroundColor: 'lightgreen', width: 50 }]}>
            <Text style={{ color: 'green' }}>Active</Text>
          </View>
        ) : (
          <View style={[styles.active, { backgroundColor: 'lightyellow', width: 65 }]}>
            <Text style={{ color: 'orange' }}>Pending</Text>
          </View>
        )}
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <View style={[styles.button, { backgroundColor: '#67d075' }]}>
          <Icon name="like" color="green" />
          <Text style={styles.buttonText}>{likes}</Text>
        </View>
        <View style={[styles.button, { backgroundColor: 'lightyellow' }]}>
          <Icon name="dislike" color="yellow" />
          <Text style={styles.buttonText}>{dislikes}</Text>
        </View>
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
    justifyContent: 'space-between',
    minWidth: 200
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
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    borderWidth: 0.5,
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