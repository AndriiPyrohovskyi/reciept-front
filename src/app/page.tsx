'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeList from '../components/RecipeList/RecipeList';
import Filters from '../components/Filters/Filters';
import QuickFilters from '../components/QuickFilters/QuickFilters';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const ingredient = searchParams.get('ingredient');
  const country = searchParams.get('country');
  const category = searchParams.get('category');

  const hasFilters = ingredient || country || category;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recipe Book
      </h1>
      <Filters />
      {!hasFilters && <QuickFilters />}
      {hasFilters && (
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to All Recipes
          </Link>
        </div>
      )}
      <RecipeList
        ingredient={ingredient || undefined}
        country={country || undefined}
        category={category || undefined}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
