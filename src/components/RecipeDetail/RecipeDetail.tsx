'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Sidebar from '../Sidebar/Sidebar';

interface RecipeDetailProps {
  recipeId: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: string;
}

export default function RecipeDetail({ recipeId }: RecipeDetailProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/recipes/${recipeId}`);
      setRecipe(response.data.meals?.[0] || null);
    } catch (err) {
      setError('Failed to fetch recipe');
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || '' });
      }
    }
    return ingredients;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error || !recipe) return (
    <div className="text-center text-red-500 text-xl">{error || 'Recipe not found'}</div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-6 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.strMeal}</h1>
              <Link
                href={`/?country=${recipe.strArea}`}
                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {recipe.strArea}
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Instructions</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>

          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getIngredients().map((item, index) => (
                <Link
                  key={index}
                  href={`/?ingredient=${item.ingredient}`}
                  className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-gray-700">{item.ingredient}</span>
                  <span className="text-gray-500">{item.measure}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <Sidebar category={recipe.strCategory} />
      </div>
    </div>
  );
}