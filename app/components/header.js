
'use client';

import { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="bg-amber-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">Family Store</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products"
        className="border border-gray-300 p-2 rounded"
      />
    </header>
  );
}
