import { getProductById } from "@/core/products/actions/get-products-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["productos", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  return {
    productQuery,
  };
};
