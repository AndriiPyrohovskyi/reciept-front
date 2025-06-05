'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCategory?: string;
}

interface RecipeListProps {
  ingredient?: string;
  country?: string;
  category?: string;
  search?: string;
}

export default function RecipeList({ ingredient, country, category, search }: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, [ingredient, country, category, search]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (ingredient) params.append('ingredient', ingredient);
      if (country) params.append('country', country);
      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const response = await axios.get(`http://localhost:3001/api/recipes?${params}`);
      setRecipes(response.data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (search) return `Search results for "${search}"`;
    if (ingredient) return `Recipes with ${ingredient}`;
    if (country) return `${country} Recipes`;
    if (category) return `${category} Recipes`;
    return 'All Recipes';
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 text-xl">{error}</div>
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">{getTitle()}</h2>
      {recipes.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No recipes found. Try different filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {recipe.strMeal}
                  </h3>
                  {recipe.strArea && (
                    <p className="text-sm text-gray-600">{recipe.strArea}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}