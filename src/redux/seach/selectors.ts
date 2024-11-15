import { RootState } from '../store';

export const searchSelector = (state: RootState) => state.search.searchValue;
