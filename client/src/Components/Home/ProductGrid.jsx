import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductsGrid = ({ currentPage, searchQuery, sort, filter }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const apiUrl = `http://localhost:3000/product/get?page=${currentPage}&limit=12&search=${searchQuery}&sort=${sort}&type=${filter}`;
            try {
                const response = await axios.get(apiUrl);
                setProducts(response.data.data.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, sort, filter]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsGrid;
