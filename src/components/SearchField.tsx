import { ChangeEvent, useCallback, useMemo } from 'react';
import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

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
  value = '',
}: {
  name?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onTimeout?: (fieldValue: string) => void,
  placeholder?: string,
  timeoutDelay?: number,
  value: string,
}) {
  const updateFilterParams = useCallback(
    (fieldValue: string) => {
      if (onTimeout) {
        onTimeout(fieldValue);
      }
    },
    [onTimeout],
  );

  const debouncedUpdateFilterParams = useMemo(
    () => debounce(updateFilterParams, timeoutDelay),
    [updateFilterParams, timeoutDelay],
  );

  const handleInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateFilterParams(e.target.value);

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
        value={value}
      />
    </Search>
  );
}

export default SearchField;
