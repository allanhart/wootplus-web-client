import { QueryFunctionContext } from 'react-query';

import { WootItem } from 'types';

export const getWootItems = (
  // Type the payload passed from our React component into our API function.
  // We want to pass an object containing the `accountName` property.
  // The first element (`string`) is the key of the query (needed by react-query).
  params: QueryFunctionContext<[string, { url: string }]>
): Promise<WootItem[]> => {
  // We can destructure `param.queryKey`:
  //  - first item is the query key.
  //  - second item is the object containing properties passed from the React component.
  const [, { url }] = params.queryKey;

  // Do a native `fetch`. Handle errored responses (4xx, 5xx).
  return fetch(url, { method: 'GET' }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to fetch user-account: error ${response.status}`)
    }

    return response.json() as Promise<WootItem[]>
  });
}

