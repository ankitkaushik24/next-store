'use client';

import { ProductsCatalog } from "@/components/ProductsCatalog/ProductsCatalog";
import ProductsDashboard from "@/components/ProductsDashboard/ProductsDashboard";
import { useUserService } from "@/services/UserServiceProvider";
import { redirect } from "next/navigation";

export default function Products() {
    const {isAdmin, currentUser} = useUserService();
    if (!currentUser) {
        redirect('/');
    }
    return isAdmin ? <ProductsDashboard /> : <ProductsCatalog />; 
}