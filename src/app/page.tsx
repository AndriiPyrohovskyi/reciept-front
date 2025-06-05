import RecipeList from '../components/RecipeList/RecipeList';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recipe Book
      </h1>
      <RecipeList />
    </main>
  );
}
