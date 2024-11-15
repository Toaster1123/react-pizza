import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SortComponent } from '../components/Sort';
import { Categories } from '../components/categories';
import { ItemBlock } from '../components/ItemBlock';
import { Placeholder } from '../components/ItemBlock/Placeholder';
import { Pagination } from '../components/Pagination';
import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilter, selectSort } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { searchSelector } from '../redux/seach/selectors';
import { setActiveCategory, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { activeCategory, currentPage } = useSelector(selectFilter);
  const activeSort = useSelector(selectSort);
  const totalPages = 3;
  const { items, status } = useSelector(selectPizzaData);

  const searchValue = useSelector(searchSelector);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setActiveCategory(id));
  }, []);
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      if (sortParam) {
        dispatch(
          setFilters({
            ...params,
            sort: { name: sortParam.name, sortProperty: sortParam.sortProperty },
            activeCategory: 0,
            currentPage: 0,
          }),
        );
      }
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.sortProperty,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activeSort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (!isSearch.current) {
      const category = activeCategory ? `&category=${activeCategory}` : '';
      const sortBy = activeSort.sortProperty;
      const page = `&page=${currentPage}`;
      const perPage = `&limit=8`;
      dispatch(fetchPizzas({ category, sortBy, page, perPage }));
    }

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories value={activeCategory} onClickCategory={onChangeCategory} />
        <SortComponent value={activeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == 'error' ? (
        <div>
          <h2>Что-то пошло не так 😒</h2>
        </div>
      ) : (
        <div className="content__items">
          {status == 'loading'
            ? [...Array(6)].map((_, index) => <Placeholder key={index} />)
            : items
                .filter((obj: any) => {
                  return obj.title.toLowerCase().includes(searchValue.toLowerCase());
                })
                .map((item: any) => <ItemBlock key={item.id} {...item} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} totalPages={totalPages} />
    </>
  );
};
