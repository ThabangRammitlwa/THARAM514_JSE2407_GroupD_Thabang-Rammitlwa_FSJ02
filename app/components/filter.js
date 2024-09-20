"use client"

import { useState } from "react"

export default function Filter({ onFilter, onSort, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
       onFilter(category)
    };

    const handleSortOrderChange = (e) => {
        const order =e.target.value;
        setSortOrder(order);
        onSort(order)
    
    };

  return (
      <div className="flex justify-between items-center mb-6">
          <select value={selectedCategory} onChange={handleCategoryChange} className="border border-gray-300 p-2 rounded">
              <option value="" >All categories</option>
              {categories && categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                  ))}
          </select>
          <select value={sortOrder} onChange={handleSortOrderChange} className="border border-gray-300 p-2 rounded ml-4">
        <option value="asc">Sort by Ascending</option>
        <option value="desc">Sort by Descending</option>
      </select>
      
    </div>
  )
}
