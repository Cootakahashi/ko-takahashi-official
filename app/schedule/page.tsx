import React from 'react';
import { getJsonData } from '../../lib/data-loader';
import ScheduleView from '../../components/ScheduleView';

export default async function SchedulePage() {
  const data = await getJsonData('schedule.json');
  console.log('[SchedulePage] Data loaded:', data ? 'Success' : 'Failure');

  return <ScheduleView initialData={data} />;
}