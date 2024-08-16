import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Brand from "../components/Brand";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import CatItem from "../components/CatItem";
import header from "../config/header";
import label from "../config/label";
import ProduceDetails from "../components/ProduceDetails";
import MenuHeader from "../components/MenuHeader";
import SearchBar from "../components/SearchBar";
import MainMenu from "../components/MainMenu";

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
  const [produceList, setProduceList] = useState([]);

  const onResults = (result) => {
    setProduceList(result);
    console.log(produceList);
  };

  return (
    <View style={styles.screen}>
      <Screen>
        <MenuHeader
          image={require("../assets/Avatar.png")}
          color={primary.p900}
          title={"AgroXlink"}
        />
        <ScrollView contentContainerStyle={styles.scrollview}>
          <SearchBar
            placeholder={"Search farm produce"}
            field={"produce"}
            onResults={(result) => onResults(result)}
          />
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
        {/* <MainMenu currentPage={0} /> */}
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
