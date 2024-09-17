"use client"

import { useState } from "react"

export default function Filter({ onCategoryChange, onSortOrderChange, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [SortOrder, setSortOrder] = useState('asc');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onCategoryChange(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        onSortOrderChange(e.target.value);
    
    };

  return (
      <div className="flex justify-between items-center mb-6">
          <select value={selectedCategory} onChange={handleCategoryChange} className="border border-gray-300 p-2 rounded">
              <option value="" >All categories</option>
              {categories && categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                  ))}
          </select>
      
    </div>
  )
}
