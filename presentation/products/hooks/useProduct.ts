import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-products-by-id.action";
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);

  const productQuery = useQuery({
    queryKey: ["productos", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //Mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) => {
      //Disparar la accion de guardar
      return updateCreateProduct({
        ...data,
        id: productIdRef.current,
      });
    },
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      //Invalidar products queries
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["productos", data.id],
      });

      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
  });

  return {
    productQuery,
    productMutation,
  };
};
