'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterOption {
  value: string;
  label: string;
}

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const ingredients: FilterOption[] = [
    { value: 'chicken', label: 'Chicken' },
    { value: 'beef', label: 'Beef' },
    { value: 'pork', label: 'Pork' },
    { value: 'salmon', label: 'Salmon' },
    { value: 'potato', label: 'Potato' },
    { value: 'rice', label: 'Rice' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'cheese', label: 'Cheese' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'onion', label: 'Onion' },
  ];
  const countries: FilterOption[] = [
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Croatian', label: 'Croatian' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Egyptian', label: 'Egyptian' },
    { value: 'French', label: 'French' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Jamaican', label: 'Jamaican' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Kenyan', label: 'Kenyan' },
    { value: 'Malaysian', label: 'Malaysian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Tunisian', label: 'Tunisian' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Vietnamese', label: 'Vietnamese' },
  ];
  const categories: FilterOption[] = [
    { value: 'Beef', label: 'Beef' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Goat', label: 'Goat' },
    { value: 'Lamb', label: 'Lamb' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Pork', label: 'Pork' },
    { value: 'Seafood', label: 'Seafood' },
    { value: 'Side', label: 'Side' },
    { value: 'Starter', label: 'Starter' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vegetarian', label: 'Vegetarian' },
  ];

  useEffect(() => {
    const ingredient = searchParams.get('ingredient');
    const country = searchParams.get('country');
    const category = searchParams.get('category');

    if (ingredient) {
      setSelectedFilter('ingredient');
      setSelectedValue(ingredient);
    } else if (country) {
      setSelectedFilter('country');
      setSelectedValue(country);
    } else if (category) {
      setSelectedFilter('category');
      setSelectedValue(category);
    }
  }, [searchParams]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
    setSelectedValue('');
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value && selectedFilter) {
      router.push(`/?${selectedFilter}=${encodeURIComponent(value)}`);
    } else {
      router.push('/');
    }
  };

  const clearFilters = () => {
    setSelectedFilter('');
    setSelectedValue('');
    router.push('/');
  };

  const getFilterOptions = (): FilterOption[] => {
    switch (selectedFilter) {
      case 'ingredient':
        return ingredients;
      case 'country':
        return countries;
      case 'category':
        return categories;
      default:
        return [];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Recipes</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Вибір типу фільтра */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Filter by:
          </label>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select filter type</option>
            <option value="ingredient">Ingredient</option>
            <option value="country">Country</option>
            <option value="category">Category</option>
          </select>
        </div>

        {selectedFilter && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}:
            </label>
            <select
              value={selectedValue}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select {selectedFilter}</option>
              {getFilterOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {(selectedFilter || selectedValue) && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {(searchParams.get('ingredient') || searchParams.get('country') || searchParams.get('category')) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchParams.get('ingredient') && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Ingredient: {searchParams.get('ingredient')}
            </span>
          )}
          {searchParams.get('country') && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Country: {searchParams.get('country')}
            </span>
          )}
          {searchParams.get('category') && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Category: {searchParams.get('category')}
            </span>
          )}
        </div>
      )}
    </div>
  );
}