import { StyleSheet } from "react-native";

fontFamily = "RedHatText";

const l1 = {
  fontSize: 20,
};
const l2 = {
  fontSize: 16,
};
const l3 = {
  fontSize: 14,
};

const l4 = {
  fontSize: 12,
};

const label = StyleSheet.create({
  l1r: {
    ...l1,
    fontFamily,
    fontWeight: "regular",
  },
  l1b: {
    ...l1,
    fontFamily,
    fontWeight: "semibold",
  },
  l2r: {
    ...l2,
    fontFamily,
    fontWeight: "regular",
  },
  l2b: {
    ...l2,
    fontFamily,
    fontWeight: "bold",
  },

  l3r: {
    ...l3,
    fontFamily,
    fontWeight: "regular",
  },
  l3b: {
    ...l3,
    fontFamily,
    fontWeight: "bold",
  },
  l4r: {
    ...l4,
    fontFamily,
    fontWeight: "regular",
  },
  l4b: {
    ...l4,
    fontFamily,
    fontWeight: "\bold",
  },
});

export default label;
