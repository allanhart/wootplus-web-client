import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
// import { debounce } from '@mui/material/utils';

import SearchField from "./SearchField";

function WootItemFilterView({ baseParams }: {
  baseParams: Record<string, string>
}) {
  const { replace, query } = useRouter();
  // const [filterParams, setFilterParams] = useState<Object|undefined>(undefined);

  const updateQueryParams = useCallback((fieldName:string, fieldValue:string) => {
    const updatedFilterParams = { ...query, [fieldName]: fieldValue };

    replace(
      { query: { ...baseParams, ...updatedFilterParams } },
      undefined,
      { shallow: true }
    );

    console.log('TODO: invoke change handler either immediately or with delay');
  }, [baseParams, query, replace]);

  const handleSearchFieldChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    updateQueryParams(e.target.name, e.target.value);
  }, [updateQueryParams]);

  return (
    <SearchField
      name='title'
      onChange={handleSearchFieldChange}
      value={query.title as string || ''}
    />
  );
}

export default WootItemFilterView;