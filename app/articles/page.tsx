import React from 'react';
import { getJsonData } from '../../lib/data-loader';
import ArticlesView from '../../components/ArticlesView';

export default async function ArticlesPage() {
  const data = await getJsonData('articles.json');
  console.log('[ArticlesPage] Data loaded:', data ? 'Success' : 'Failure');

  return <ArticlesView initialData={data} />;
}