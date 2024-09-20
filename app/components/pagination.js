import Link from 'next/link';

export default function Pagination({ currentPage, hasMore }) {
  return (
    <div className="flex justify-center items-center space-x-4 my-12">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          ← Previous
        </Link>
      )}
      <span className="text-gray-700 font-semibold">Page {currentPage}</span>
      {hasMore && (
        <Link href={`/?page=${currentPage + 1}`} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Next →
        </Link>
      )}
      
    </div>
  );
}


