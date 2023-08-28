'use client';

import { IProduct } from "@/models/product.model";
import { useEffect, useState } from "react";

interface IProductsCatalogServiceState {
    categories: string[];
    selectedCategory: string;
    productsInCategory: IProduct[];
};

export function useProductsCatalogState() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productsInCategory, setProductsInCategory] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(fetchedCategories => {
            setCategories(fetchedCategories);
            setSelectedCategory(fetchedCategories[0]);
        });
    }, []);

    useEffect(() => {
        if (categories && selectedCategory) {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then(res => res.json())
            .then(products => setProductsInCategory(products));
        }
    }, [categories, selectedCategory]);

    return {categories, selectedCategory, productsInCategory, setSelectedCategory};
}
