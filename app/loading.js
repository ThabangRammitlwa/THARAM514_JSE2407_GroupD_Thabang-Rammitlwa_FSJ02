/**
 * Loading component that displays a loading spinner with a centered animation.
 * 
 * @returns {JSX.Element} - The loading screen with an animated spinner and a message.
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-amber-600 border-solid"></div>
        
      
        <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
      </div>

      <p className="mt-6 text-amber-800 text-xl font-semibold animate-pulse">
        Loading products details...
      </p>
    </div>
  );
}
