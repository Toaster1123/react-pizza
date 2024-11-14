import ReactPaginate from 'react-paginate';
import Styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
  totalPages: number;
};
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  totalPages,
}) => {
  return (
    <ReactPaginate
      className={Styles.root}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
