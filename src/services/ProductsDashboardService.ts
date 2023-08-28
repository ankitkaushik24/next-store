import { IProduct } from "@/models/product.model";
import { useEffect, useMemo, useReducer, useState } from "react";

export const PAGE_SIZE = 10;

export function useProductsDashboardService() {
  const [products, dispatch] = useReducer(
    (state: IProduct[], { type, payload }: { type: string; payload: any }) => {
      switch (type) {
        case "fetched":
          return payload;
        case "added":
          return [payload].concat(state);
        case "updated":
          return state.map((product) => {
            if (product.id === payload.id) {
              return payload;
            }
            return product;
          });
        case "deleted":
          return state.filter((product) => product.id !== payload.id);
      }
      return state;
    },
    []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const visibleProducts = useMemo(() => {
    return products?.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);
  }, [products, pageIndex]);
  const totalCount = useMemo(() => products?.length ?? 0, [products]);

  useEffect(() => {
    fetchProducts().then((fetchedProducts) =>
      dispatch({ type: "fetched", payload: fetchedProducts })
    );
  }, []);

  // actions
  function addProduct({
    payload,
    postRequest,
  }: {
    payload: IProduct;
    postRequest: () => void;
  }) {
    createProductReq(payload).finally(() => postRequest());
  }
  function updateProduct({
    payload,
    postRequest,
  }: {
    payload: IProduct;
    postRequest: () => void;
  }) {
    updateProductReq(payload.id, payload);
  }

  function deleteProduct(productId: number) {
    deleteProductReq(productId);
  }

  // API calls
  function fetchProducts(): Promise<IProduct[]> {
    return fetch("https://fakestoreapi.com/products").then((res) => res.json());
  }

  function createProductReq(payload: IProduct) {
    return fetch("https://fakestoreapi.com/products", {
      body: JSON.stringify(payload),
      method: "POST",
    });
  }

  function updateProductReq(productId: number, updatedProduct: IProduct) {
    return fetch(`https://fakestoreapi.com/products/${productId}`, {
      body: JSON.stringify(updatedProduct),
      method: "PUT",
    });
  }

  function deleteProductReq(_id: number) {
    return fetch(`https://fakestoreapi.com/products/${_id}`, {
      method: "DELETE",
    });
  }

  return {
    setPageIndex,
    visibleProducts,
    totalCount,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}