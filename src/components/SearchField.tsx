import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { debounce } from '@mui/material/utils';
import SearchIcon from '@mui/icons-material/Search';


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  color: 'inherit',
  padding: theme.spacing(0.5, 0.5, 0.5, 1),

  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 220,
  },
}));


function SearchField({
  name,
  onChange,
  onClear,
  onTimeout,
  placeholder = 'Search...',
  timeoutDelay = 300,
  value,
}: {
  name?: string,
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
  onClear?: MouseEventHandler<HTMLButtonElement> | undefined;
  onTimeout?: ChangeEventHandler<HTMLInputElement> | undefined,
  placeholder?: string,
  timeoutDelay?: number,
  value: string,
}) {
  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    setFieldValue(value);
  }, [value]);


  const handleDebouncedInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    if (onTimeout) {
      onTimeout(e);
    }
  }, [onTimeout]);

  const debouncedUpdateFilterParams = useMemo(() => (
    debounce(handleDebouncedInputChange, timeoutDelay)
  ), [handleDebouncedInputChange, timeoutDelay]);

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    debouncedUpdateFilterParams(e);

    if (onChange) {
      onChange(e);
    }
  };

  const handleClearButtonClick = (e:MouseEvent<HTMLButtonElement>) => {
    setFieldValue('');

    if (onClear) {
      onClear(e);
    }
  };

  return (
    <StyledInputBase
      inputProps={{ 'aria-label': 'search' }}
      name={name}
      onChange={handleInputChange}
      startAdornment={(
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )}
      endAdornment={fieldValue ? (
        <IconButton
          size="small"
          onClick={handleClearButtonClick}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      placeholder={placeholder}
      value={fieldValue}
    />
  );
}

export default SearchField;
