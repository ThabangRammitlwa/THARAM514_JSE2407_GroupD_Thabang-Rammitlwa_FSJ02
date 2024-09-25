"use client"

import { useState,useEffect } from "react"

export default function Filter({
    categories,
    currentCategory,
    currentSortBy,
    currentSortOrder,
    onFilter,
    onSort,
    onReset
}) {
  
  
    return (
  
        <div className="flex flex-wrap items-center gap-4 py-6 px-6 text-amber-800 font-serif">
          <select
            value={currentCategory}
            onChange={(e) => onFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories && categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={`${currentSortBy}-${currentSortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onSort(sortBy, sortOrder);
            }}
            className="p-2 border rounded"
          >
            <option value="">Price: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
          <button onClick={onReset} className="bg-amber-100 p-2 rounded">Reset All</button>
        </div>
    );
  }