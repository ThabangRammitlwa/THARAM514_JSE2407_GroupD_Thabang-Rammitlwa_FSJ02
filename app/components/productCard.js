'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductCard({ products }) {
  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    if (products) {
      setLoading(false);
      const initialImageState = products.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setCurrentImages(initialImageState);
    }
  }, [products]);

  const changeImage = (productId, direction) => {
    setCurrentImages(prev => {
      const currentIndex = prev[productId];
      const imageCount = products.find(p => p.id === productId).images.length;
      let newIndex = (currentIndex + direction + imageCount) % imageCount;
      return { ...prev, [productId]: newIndex };
    });
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-amber-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((product, index) => (
          <Link key={index} href={`/product/${product.id}`}>
            <div className="relative overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer bg-white shadow-lg rounded-lg">
              <h2 className="relative w-full flex-none mb-2 text-xl sm:text-2xl font-semibold text-amber-800 p-4">{product.title}</h2>
              <div className="relative">
                <img
                  src={product.images[currentImages[product.id]]}
                  className="h-48 object-cover w-full rounded-t-lg"
                  alt={`${product.title} - Image ${currentImages[product.id] + 1}`}
                />
                {product.images.length > 1 && (
                  <div className="absolute inset-0 flex justify-between items-center px-2 sm:px-4">
                    <button
                      onClick={(e) => { e.preventDefault(); changeImage(product.id, -1); }}
                      className=" text-amber-800 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition-colors duration-300"
                    >
                      &lt;
                    </button>
                    <span className="text-white px-2 py-1 text-sm bg-black bg-opacity-50 rounded">
                      {currentImages[product.id] + 1} / {product.images.length}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); changeImage(product.id, 1); }}
                      className="text-amber-800 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition-colors duration-300"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-lg text-amber-600">R{product.price}</p>
                <p className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-800 mr-2 mb-2">
                  {product.category}
                </p>
                <p className="text-sm text-gray-600 mb-2">Rating: {product.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
