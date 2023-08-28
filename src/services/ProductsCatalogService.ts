'use client';

import { IProduct } from "@/models/product.model";
import { useLoading } from "@/utils/LoadersProvider";
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
    const loading = useLoading();

    useEffect(() => {
        loading(() => fetch('https://fakestoreapi.com/products/categories'), 'main')
        .then(res => res.json())
        .then(fetchedCategories => {
            setCategories(fetchedCategories);
            setSelectedCategory(fetchedCategories[0]);
        });
    }, [loading]);

    useEffect(() => {
        if (categories && selectedCategory) {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then(res => res.json())
            .then(products => setProductsInCategory(products));
        }
    }, [categories, selectedCategory]);

    return {categories, selectedCategory, productsInCategory, setSelectedCategory};
}
