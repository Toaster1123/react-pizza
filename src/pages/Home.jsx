import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setActiveCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { Sort } from '../components/Sort';
import { Categories } from '../components/categories';
import { ItemBlock } from '../components/ItemBlock';
import { Placeholder } from '../components/ItemBlock/Placeholder';
import { Pagination } from '../components/Pagination';
import { sortList } from '../components/Sort';
export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { activeCategory, currentPage } = useSelector((state) => state.filter);
  const activeSort = useSelector((state) => state.filter.sort);

  const { items, status } = useSelector((state) => state.pizza);

  const searchValue = useSelector((state) => state.search.searchValue);

  const [totalPages, setTotalPages] = React.useState(null);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort: { name: sortParam.name, sortProperty: sortParam.sortProperty },
        }),
      );
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
        <Categories
          value={activeCategory}
          onClickCategory={(id) => dispatch(setActiveCategory(id))}
        />
        <Sort />
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
                .filter((obj) => {
                  return obj.title.toLowerCase().includes(searchValue.toLowerCase());
                })
                .map((item) => <ItemBlock key={item.id} {...item} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} totalPages={totalPages} />
    </>
  );
}
