import { ProductTable } from "@/components/products/ProductTable";
import { useDashboardProducts } from "@/hooks/products"

export const ProductPage = () => {
    const { data: allProducts= [],  } = useDashboardProducts();
    
    // const totalProducts = allProducts.length;

    return (
        <div className="">
            <div className="">
                <h1>Products</h1>
            </div>

            <ProductTable 
                products={allProducts}
            />
        </div>
    )
}