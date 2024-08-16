import React from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import neutral from "../config/colors/neutralColor";
import EnterButton from "../components/EnterButton";

function ProductDetailsScreen() {
  return (
    <Screen>
      <View>
        <ImageBackground>
          <TouchableOpacity>
            <View style={styles.backbutton}>
              <FontAwesome6
                name="arrow-left-long"
                size={10}
                color={neutral.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <FontAwesome
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={24}
                color={neutral.white}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View>
            <View>
              <Text>{name}</Text>
              <Text>{owner}</Text>
            </View>
            <Text>{price}</Text>
          </View>
          <Text>In Stock 4.9</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionHeader}></Text>
          <Text>{description}</Text>
        </View>
        <View style={styles.reviews}></View>
        <FlatList style={styles.otherProduce} horizontal></FlatList>
      </ScrollView>
      <EnterButton />
    </Screen>
  );
}

const styles = StyleSheet.create({});
export default ProductDetailsScreen;
