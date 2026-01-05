import React from 'react';
import { getJsonData } from '../../lib/data-loader';
import StoryView from '../../components/StoryView';

export default async function StoryPage() {
  const data = await getJsonData('story.json');
  console.log('[StoryPage] Data loaded:', data ? 'Success' : 'Failure');
  
  return <StoryView initialData={data} />;
}