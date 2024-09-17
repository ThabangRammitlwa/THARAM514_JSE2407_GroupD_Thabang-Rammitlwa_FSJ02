"use client"

import { useState ,useEffect } from 'react';
import Link from 'next/link';


export function ProductDetail({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (product) {
            setLoading(false);
        }
    }, [product]);
  
    const handlePrevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    };
  
    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handleImageClick = (index) => {
      setCurrentImageIndex(index);
    };
  
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // Filled star
        } else {
          stars.push(<span key={i} className="text-gray-400">&#9733;</span>); // Empty star
        }
      }
      return stars;
    };

    if (loading) {
        return <div className='text-centre p-4'>Loading...</div>;
    }
  
    return (
      <div className="py-12">
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            ←
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
          <div className="md:flex">
            <div className="relative md:w-1/2">
              <img
                src={product.images[currentImageIndex]}
                className="w-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2  text-amber-800 p-2 rounded-full hover:bg-amber-500 transition-colors duration-300"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2  text-amber-800 p-2 rounded-full hover:bg-amber-500 transition-colors duration-300"
                  >
                    &gt;
                  </button>
                </>
              )}
              <div className="flex justify-center mt-4 space-x-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className={`h-16 w-16 object-cover cursor-pointer ${currentImageIndex === index ? 'border-2 border-amber-600' : 'border'}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4 text-amber-800">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-amber-600 mb-4">
                R{product.price.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <p className="text-sm text-gray-600 mb-2">
                Category: {product.category}
              </p>
              <div className="mb-4">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Rating: {product.rating} / 5
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Stock: {product.stock}
                {product.stock > 0 ? (
                  <span className="text-green-600 ml-2">(In Stock)</span>
                ) : (
                  <span className="text-red-600 ml-2">(Out of Stock)</span>
                )}
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="mt-8 p-8">
            <h2 className="text-2xl font-bold mb-4 text-amber-800">Reviews</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="font-semibold">{review.reviewerName || "Anonymous"}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    <div className="flex items-center mt-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }