import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
    const placeholderImage = "https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo.jpg?imbypass=true";

    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={placeholderImage}
                alt={product.productName}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {product.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Model: {product.productModel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {product.product_price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
