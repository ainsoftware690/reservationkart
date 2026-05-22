import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const metadata = {
  title: 'Flight Search Results',
  description: 'Find the best flights for your journey',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SearchResults />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-medium text-gray-600">Searching flights...</p>
      </div>
    </div>
  );
}