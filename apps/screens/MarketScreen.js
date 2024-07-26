import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Brand from "../components/Brand";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import body from "../config/body";
import CatItem from "../components/CatItem";
import header from "../config/header";
import label from "../config/label";
import ProduceDetails from "../components/ProduceDetails";
import CropCare from "../assets/cropCare.svg";
import Home from "../assets/home.svg";
import Messages from "../assets/message.svg";
import People from "../assets/people.svg";
import MenuHeader from "../components/MenuHeader";
import SearchBar from "../components/SearchBar";

const categories = [
  {
    name: "beverages",
    image: require("../assets/beverages.png"),
  },
  {
    name: "cereals",
    image: require("../assets/cereals.png"),
  },
  {
    name: "fibres",
    image: require("../assets/fibres.png"),
  },
  {
    name: "fruits",
    image: require("../assets/fruits.png"),
  },
  {
    name: "legumes",
    image: require("../assets/legumes.png"),
  },
  {
    name: "spices",
    image: require("../assets/spices.png"),
  },
  {
    name: "tubers",
    image: require("../assets/tubers.png"),
  },
  {
    name: "vegetables",
    image: require("../assets/vegetables.png"),
  },
];

const produce = [
  {
    name: "Tomatoes",
    farmName: "Bomo Fresh Farm",
    image: require("../assets/tomatoes.png"),
    price: 1499,
    unit: "Per Basket",
  },
  {
    name: "Maize",
    farmName: "Shika Farm",
    image: require("../assets/corn.png"),
    price: 3739,
    unit: "Per Bag",
  },
  {
    name: "Irish Potatoes",
    farmName: "Harvest Haven Farm",
    image: require("../assets/irish-potatoes.png"),
    price: 49903,
    unit: "Per Basket",
  },
  {
    name: "Apples",
    farmName: "Orchard View Farm",
    image: require("../assets/red-onions.png"),
    price: 1269,
    unit: "Per Basket",
  },
  {
    name: "Red Onions",
    farmName: "Sunny Acres Farm",
    image: require("../assets/apple.png"),
    price: 169,
    unit: "Per Basket",
  },
  {
    name: "White Beans",
    farmName: "Sunrise Produce Farm",
    image: require("../assets/white-beans.png"),
    price: 9890,
    unit: "Per Bag",
  },
];

function MarketScreen() {
  const [menuChosen, changeMenu] = useState(0);

  return (
    <View style={styles.screen}>
      <Screen>
        <MenuHeader image={require("../assets/Avatar.png")}>
          <Brand color={primary.p900} />
        </MenuHeader>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <SearchBar placeholder={"Search farm produce"} />
          <FlatList
            style={styles.category}
            horizontal
            data={categories}
            keyExtractor={(categories) => categories.name}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CatItem title={item.name} image={item.image} />
            )}
          />
          <View style={styles.produceContainer}>
            <View style={styles.available}>
              <Text style={{ color: neutral.n900, ...header.h4 }}>
                Available Produce
              </Text>
              <TouchableOpacity
                style={{ borderBottomWidth: 1, borderColor: neutral.n600 }}
              >
                <Text style={{ color: neutral.n600, ...label.l3b }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.availableProduce}>
              {produce.map((prod, index) => {
                return (
                  <ProduceDetails
                    key={index}
                    name={prod.name}
                    farmName={prod.farmName}
                    price={prod.price}
                    unit={prod.unit}
                    image={prod.image}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View style={styles.mainMenu}>
          <TouchableOpacity onPress={() => changeMenu(0)}>
            <View style={styles.menu}>
              <Home
                width={20}
                color={menuChosen === 0 ? primary.p900 : neutral.n950}
              />
              <Text
                style={{
                  color: menuChosen === 0 ? primary.p900 : neutral.n900,
                  ...label.l4b,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMenu(1)}>
            <View style={styles.menu}>
              <CropCare
                width={20}
                color={menuChosen === 1 ? primary.p900 : neutral.n950}
              />
              <Text
                style={{
                  color: menuChosen === 1 ? primary.p900 : neutral.n900,
                  ...label.l4b,
                }}
              >
                Crop Care
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMenu(2)}>
            <View style={styles.menu}>
              <People
                width={20}
                color={menuChosen === 2 ? primary.p900 : neutral.n950}
              />
              <Text
                style={{
                  color: menuChosen === 2 ? primary.p900 : neutral.n900,
                  ...label.l4b,
                }}
              >
                Community
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMenu(3)}>
            <View style={styles.menu}>
              <Messages
                width={20}
                color={menuChosen === 3 ? primary.p900 : neutral.n950}
              />
              <Text
                style={{
                  color: menuChosen === 3 ? primary.p900 : neutral.n900,
                  ...label.l4b,
                }}
              >
                Messages
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  available: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  availableProduce: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  category: {
    marginBottom: 36,
  },

  menu: {
    alignItems: "center",
  },

  mainMenu: {
    backgroundColor: neutral.background,
    borderTopWidth: 1,
    borderColor: neutral.n100,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
    paddingHorizontal: 32,
    paddingTop: 12,
    position: "absolute",
    width: "100%",
  },

  screen: {
    backgroundColor: neutral.background,
  },

  scrollScreen: {
    alignItems: "center",
  },

  scrollview: {
    paddingBottom: 75,
    marginTop: 26,
  },

  produceContainer: {
    marginHorizontal: 16,
  },
});
export default MarketScreen;
