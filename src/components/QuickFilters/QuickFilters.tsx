'use client';
import Link from 'next/link';

export default function QuickFilters() {
  const popularIngredients = [
    'chicken', 'beef', 'salmon', 'pasta', 'rice'
  ];

  const popularCountries = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'French'
  ];

  const popularCategories = [
    'Chicken', 'Seafood', 'Vegetarian', 'Dessert', 'Pasta'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Filters</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {popularIngredients.map((ingredient) => (
              <Link
                key={ingredient}
                href={`/?ingredient=${ingredient}`}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Countries:</h3>
          <div className="flex flex-wrap gap-2">
            {popularCountries.map((country) => (
              <Link
                key={country}
                href={`/?country=${country}`}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                {country}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <Link
                key={category}
                href={`/?category=${category}`}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}