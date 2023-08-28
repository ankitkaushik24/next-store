"use client";

import { useProductsCatalogState } from "@/services/ProductsCatalogService";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsCatalog.module.scss";
import GlobalHeader from "../GlobalHeader";

export function ProductsCatalog() {
  const {
    categories,
    productsInCategory,
    selectedCategory,
    setSelectedCategory,
  } = useProductsCatalogState();

  const updateCategory = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  return (
    <div className={styles.host}>
      <GlobalHeader />

      <header className="p-4">
        <Stack direction="row" spacing={1}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              color={selectedCategory === category ? "primary" : "default"}
              onClick={() => updateCategory(category)}
            />
          ))}
        </Stack>
      </header>
      <main className={`${styles.main} flex flex-wrap gap-6 relative`}>
        {/* <stc-loader *rxIf="'categories' | isLoading"></stc-loader> */}
        {productsInCategory.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}
