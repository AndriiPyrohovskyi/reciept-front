import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: PageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <RecipeDetail recipeId={params.id} />
    </main>
  );
}