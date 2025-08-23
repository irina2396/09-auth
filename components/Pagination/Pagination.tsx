import css from './Pagination.module.css'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    pageCount: number;
    onPageChange: (selected: number ) => void;
    currentPage: number;
}

export default function Pagination({
    pageCount,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const handlePageClick = (e: { selected: number }) => {
        onPageChange(e.selected);
    };
    if (pageCount <= 1) return null;

    return (
        <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            forcePage={currentPage}
            containerClassName={css.pagination}
            pageClassName={css.page}
            activeClassName={css.active}
            previousClassName={css.previous}
            nextClassName={css.next}
            disabledClassName={css.disabled}
        />
    )
}