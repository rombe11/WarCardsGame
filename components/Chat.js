import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, FlatList, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import { ListItem, Input, Icon, Text, Avatar, Button } from "@rneui/themed";
import socket from "../utils/socket";

export default function Chat({ route, messages, setMessages }) {
  //const {currUser} = route.params;
  const[currUser, setCurrUser] = useState('');
  const [input, setInput] = useState("");

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("join", (user) => {
      const joinMessage = `${user.fullName} Joined the chat.`;
      setCurrUser(user);
      const newMessage = {
        sender: user,
        message: joinMessage,
        isJoinMessage: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
      socket.off("join");
    };
  }, []);

  const flatListRef = useRef(null);

  const handleMsg = ({ item }) => (
    <ListItem bottomDivider>
      {!item.isJoinMessage && (
        <Avatar
          size={60}
          title={`${item.sender.fullName[0]}`}
          labelStyle={{ fontSize: 20 }}
          overlayContainerStyle={{
            backgroundColor: getRandomColor(),
          }}
        />
      )}
      <ListItem.Content>
        {!item.isJoinMessage && (
          <Text category="s1" style={{fontWeight:"bold", marginBottom: 5 }}>
            {item.sender.fullName}
          </Text>
        )}
        <Text style={{ color: item.isJoinMessage ? "gray" : "black" }}>
          {item.message}
        </Text>
      </ListItem.Content>
    </ListItem>
  );
  
  useEffect(() => {
    flatListRef.current.scrollToEnd();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log("currUser:", currUser); 
      const message = {
        sender: currUser,
        message: input,
      };
      socket.emit("message", message, () => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setInput("");
    }
  };
  

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={handleMsg}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="Enter a message:"
            value={input}
            onChangeText={setInput}
          />
        </View>
      </KeyboardAvoidingView>
      <Button style={styles.button} onPress={handleSend}>Send</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingLeft: 15,
  },
  button: {
    height: 50,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: "white", 
  },
});
