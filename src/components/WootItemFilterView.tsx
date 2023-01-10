import {ChangeEvent, MouseEventHandler, useCallback} from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import SearchField from "./SearchField";

const SEARCH_FIELD_NAME = 'title';

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
    updateQueryParams(SEARCH_FIELD_NAME, e.target.value);
  }, [updateQueryParams, query]);

  const handleSearchFieldClear:MouseEventHandler = useCallback(() => {
    updateQueryParams(SEARCH_FIELD_NAME, '');
  }, [updateQueryParams, query]);


  return (
    <Box ml={1} width="100%">
      <SearchField
        name={SEARCH_FIELD_NAME}
        onTimeout={handleSearchFieldTimeout}
        onClear={handleSearchFieldClear}
        value={query.title as string || ''}
      />
    </Box>
  );
}

export default WootItemFilterView;