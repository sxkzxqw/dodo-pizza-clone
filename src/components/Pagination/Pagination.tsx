import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type TPaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
}

const Pagination: FC<TPaginationProps> = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;