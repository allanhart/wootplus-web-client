import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

// import Link from 'components/Link';
// import paths from 'paths';

import AppContext from "AppContext";


import ListPlaceholder from "components/ListPlaceholder";
import WootItemList from "components/WootItemList";

import { syncWootItems, loadWootItems } from 'io/queries';


export default function Home() {
  const context = useContext(AppContext);
  const updateContext = context?.update;

  const syncResult = useQuery(['syncWootItems', {
   url: 'http://localhost:8000/woot-items/'
  }], syncWootItems, {
    // useErrorBoundary: true,
  });

  const loadResult = useQuery(['loadWootItems', {
   isSyncing: syncResult.isLoading,
  }], loadWootItems);

  const isReady = !(syncResult.isLoading || loadResult.isLoading);

  useEffect(() => {
    updateContext({ loadProgress: isReady ? null : undefined });
  }, [isReady, updateContext]);


  if (syncResult.isError) {
    return "Error retrieving data";
  }

  if (!(isReady && loadResult.data)) {
    return <ListPlaceholder/>;
  }

  return (
    <WootItemList items={loadResult.data} />
  );
}
