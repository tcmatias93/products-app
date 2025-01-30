import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ProductImages from "@/presentation/products/components/ProductImages";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { Formik } from "formik";
import { Size } from "@/core/products/interface/product.interface";
import MenuIconButton from "@/presentation/theme/components/MenuIconButton";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery, productMutation } = useProduct(`${id}`);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon="camera-outline"
          onPress={() => router.push("/camera")}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href={"/(products-app)/(home)"} />;
  }

  const product = productQuery.data!;

  return (
    <Formik
      initialValues={product}
      onSubmit={(producLike) => productMutation.mutate(producLike)}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <ProductImages images={values.images} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Description"
                style={{ marginVertical: 5 }}
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>

            <ThemedView
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginVertical: 5,
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView style={{ marginHorizontal: 10 }}>
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(options) => {
                  const newSizesValues = values.sizes.includes(options as Size)
                    ? values.sizes.filter((s) => s !== options)
                    : [...values.sizes, options];
                  setFieldValue("sizes", newSizesValues);
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(option) => setFieldValue("gender", option)}
              />
            </ThemedView>

            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              <ThemedButton onPress={() => handleSubmit()} icon="save-outline">
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;
