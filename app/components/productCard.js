'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';




export default function ProductCard({ products }) {
  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState({});


  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
      const initialImageState = products.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setCurrentImages(initialImageState);
    }
  }, [products]);

  const changeImage = ( e,productId, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImages(prev => {
      const currentIndex = prev[productId];
      const imageCount = products.find(p => p.id === productId).images.length;
      let newIndex = (currentIndex + direction + imageCount) % imageCount;
      return { ...prev, [productId]: newIndex };
    });
  };


  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm: py-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products && products.map((item,index) => (
          <Link key={index} href={`/product/${item.id}?page={currentPage}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[300px] sm:h-[350px] md:h-[400px]">
              <div className="p-4">
                <h2 className="text-xl font-bold font-sans text-amber-900 mb-2">{item.title}</h2>
                <div className="relative aspect-w-1 aspect-h-1 h-32 sm:h-40 md:h-48">
                  <img
                    src={item.images[currentImages[item.id]]} className="h-full object-contain w-full "
                    alt={`${item.title} - Image ${currentImages[item.id] + 1}`}
                  />
                  {item.images.length > 1 && (
                    <div className="absolute inset-0 flex justify-between items-center px-2">
                      <button
                        onClick={(e) => changeImage(e, item.id, -1)}
                        className="text-amber-900 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75"
                      >
                        &lt;
                      </button>
                  
                      <button
                        onClick={(e) => changeImage(e, item.id, 1)}
                        className="text-amber-900 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75"
                      >
                        &gt;
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-amber-50">
                <p className="text-lg font-mono font-bold text-amber-900">R{item.price.toFixed(2)}</p>
                <p className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-serif text-amber-800 mr-2 mb-2">
                  {item.category}
                </p>
                <p className="text-sm text-gray-600">Rating: {item.rating.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
