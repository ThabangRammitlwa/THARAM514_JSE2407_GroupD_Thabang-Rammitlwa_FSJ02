"use client"

import Link from 'next/link';
import { useState, useEffect } from "react"

/**
 * Header component that displays the navigation bar with links to different pages.
 *
 * @returns {JSX.Element} - The header component containing the website's logo and navigation links.
 */
export default function Header({
  currentSearch,
  onSearch,
}) {

  const [search, setSearch] = useState(currentSearch);
 
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <header className="bg-gradient-to-r from-amber-800 via-yellow-600 to-brown-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded mr-2"
          />
          <button type="submit" className="bg-amber-600 text-white p-2 rounded">Search</button>
        </form>
        <Link href="/" className="flex items-center group">
          <span className="font-['Brush_Script_MT',_cursive] text-4xl text-white tracking-wider group-hover:text-yellow-300 transition-colors duration-300">
            Family Store
          </span>
        </Link>
        {/* Navigation links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-amber-800 hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
} 
  

