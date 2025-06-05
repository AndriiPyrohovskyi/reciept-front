'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface SidebarProps {
  category: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Sidebar({ category }: SidebarProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryRecipes();
  }, [category]);

  const fetchCategoryRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/recipes?category=${category}`);
      setRecipes(response.data.meals?.slice(0, 5) || []);
    } catch (err) {
      console.error('Failed to fetch category recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-700">More {category} Recipes</h3>
        <Link
          href={`/?category=${category}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All
        </Link>
      </div>
      
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-3">
              <div className="rounded bg-gray-300 h-16 w-16"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.idMeal}
              href={`/recipe/${recipe.idMeal}`}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <h4 className="text-sm font-medium text-gray-700 line-clamp-2">
                {recipe.strMeal}
              </h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}