import { StyleSheet } from "react-native";
import { PixelRatio } from "react-native";

const pixelfactor = PixelRatio.get();

const head = {
  fontFamily: "RedHatDisplay",
  fontWeight: "bold",
};

const header = StyleSheet.create({
  h1: {
    ...head,
    fontSize: 40,
  },
  h2: {
    ...head,
    fontSize: 32,
  },

  h30: {
    ...head,
    fontSize: 28,
  },
  h3: {
    ...head,
    fontSize: 24,
  },
  h4: {
    ...head,
    fontSize: 18,
  },
  h40: {
    ...head,
    fontSize: 16,
  },

  h5: {
    ...head,
    fontSize: 14,
  },
});

export default header;
