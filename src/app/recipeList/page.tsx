"use client";
import { useSearchParams } from 'next/navigation';
import RecipeList from '../../components/RecipeList/RecipeList';
import Link from 'next/link';

export default function FilteredRecipeList() {
  const searchParams = useSearchParams();
  const ingredient = searchParams.get('ingredient');
  const country = searchParams.get('country');
  const category = searchParams.get('category');

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to All Recipes
        </Link>
      </div>
      <RecipeList
        ingredient={ingredient || undefined}
        country={country || undefined}
        category={category || undefined}
      />
    </div>
  );
}