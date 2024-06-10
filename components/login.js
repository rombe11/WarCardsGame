import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";
import TextAvatar from "./TextAvatar";

const Login = ({ setUsers, setMessages }) => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {
    const name = { fullName };
    setUsers((prevUsers) => [...prevUsers, name]);
    socket.emit("join", name);
    navigation.navigate("Chat", { currentUser: name });
  };

  return (
    <View style={{ flex: 1 }}>
      <TextAvatar size={100} style={{ alignSelf: "center", marginTop: 20 }}>
        {fullName}
      </TextAvatar>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Input
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={{ marginBottom: 10 }}
        />

        <View style={{ marginTop: 20 }}>
          <Button
            onPress={handleSubmit}
            disabled={!fullName.trim()}
            appearance="filled"
          >
            Enter Chat
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
