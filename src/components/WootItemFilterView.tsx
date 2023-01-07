import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

import SearchField from "./SearchField";

function WootItemFilterView({ baseParams = {} }: {
  baseParams?: Record<string, string>
}) {
  const { replace, query } = useRouter();

  const updateQueryParams = useCallback((fieldName:string, fieldValue:string) => {
    const updatedFilterParams = { ...query, [fieldName]: fieldValue };

    replace(
      { query: { ...baseParams, ...updatedFilterParams } },
      undefined,
      { shallow: true }
    );
  }, [baseParams, query, replace]);

  const handleSearchFieldTimeout = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    updateQueryParams(e.target.name, e.target.value);
  }, [updateQueryParams, query]);

  return (
    <SearchField
      name='title'
      onTimeout={handleSearchFieldTimeout}
      value={query.title as string || ''}
    />
  );
}

export default WootItemFilterView;