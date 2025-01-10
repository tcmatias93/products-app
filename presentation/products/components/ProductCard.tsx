import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Product } from "@/core/products/interface/product.interface";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { router } from "expo-router";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView style={style.container}>
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
        {product.images.length === 0 ? (
          <Image
            source={require("../../../assets/images/products/no-product-image.png")}
            style={{ width: "100%", height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: "100%" }}
          />
        )}
        <ThemedText
          numberOfLines={2}
          style={{ textAlign: "center" }}
          darkColor="black"
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ProductCard;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    margin: 3,
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
  },
});
