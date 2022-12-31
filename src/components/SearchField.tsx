import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import { debounce } from '@mui/material/utils';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function SearchField({
  name,
  onChange,
  onTimeout,
  placeholder = 'Search...',
  timeoutDelay = 300,
  value,
}: {
  name?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onTimeout?: (e:ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  timeoutDelay?: number,
  value: string,
}) {
  const { replace, query } = useRouter();


  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    setFieldValue(value);
  }, [value]);


  const handleDebouncedInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    if (onTimeout) {
      onTimeout(e);
    }
  },[onTimeout, replace, query]);

  const debouncedUpdateFilterParams = useMemo(
    () => debounce(handleDebouncedInputChange, timeoutDelay),
    [handleDebouncedInputChange, timeoutDelay],
  );

  const handleInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    debouncedUpdateFilterParams(e);

    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{ 'aria-label': 'search' }}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        value={fieldValue}
      />
    </Search>
  );
}

export default SearchField;
