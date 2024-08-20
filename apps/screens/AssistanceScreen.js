import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TypingText from "../components/TypingText";
import Message from "../components/Message";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function AssistanceScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      text: "Welcome!! What do you want to know about Agriculture",
      type: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [mainText, setMainText] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, type: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Make API call after sending the message
      fetch("https://agroxlink-ai.onrender.com/api/chat/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: input, // Send the user input to the API
            },
          ],
          data: {},
        }),
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // Extract the content field from the response
          const content = data.result.content || "No content available";
          setMainText(content);

          // Add the bot's response (mainText) to the messages
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: content, type: "bot" },
          ]);
        })
        .catch((error) => console.error("Error fetching config", error));

      setInput(""); // Clear the input field after sending
    }
  };

  return (
    <View style={styles.window}>
      <Screen>
        <ScreenHeader title={"Assistant"} onPress={() => navigation.goBack()} />
        <View style={{ padding: 16 }}>
          <ScrollView style={{ gap: 12, height: "80%" }}>
            {messages.map((message, index) => (
              <View key={index}>
                {message.type === "user" ? (
                  <Message text={message.text} who={"owner"} />
                ) : (
                  <TypingText text={message.text} speed={0} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Screen>
      <View style={styles.inputContainer}>
        <Ionicons name="attach" size={20} color={neutral.n400} />
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={20} color={primary.p500} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    backgroundColor: neutral.background,
    width: "100%",
    height: "100%",
  },

  inputContainer: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "92%",
    borderColor: neutral.n100,
    borderWidth: 1,
    borderRadius: 10,
    position: "absolute",
    bottom: 32,
    padding: 12,
  },

  input: {
    flex: 1,
    marginHorizontal: 4,
    color: neutral.n400,
  },
});

export default AssistanceScreen;
