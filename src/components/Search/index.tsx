import React from 'react';
import Styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';
import debounce from 'lodash.debounce';

export const Search: React.FC = () => {
  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((value: string) => {
      console.log(value);
      dispatch(setSearchValue(value));
    }, 400),
    [],
  );
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeInput = (event: any) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };
  return (
    <div className={Styles.search__wrapper}>
      <input
        className={Styles.search}
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={(event) => onChangeInput(event)}
      />
      {value && (
        <svg
          className={Styles['search__close-icon']}
          onClick={() => onClickClear()}
          width="800px"
          height="800px"
          viewBox="-0.5 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 21.32L21 3.32001"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 3.32001L21 21.32"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
