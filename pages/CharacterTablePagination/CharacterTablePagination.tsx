import React from "react";
import { Pagination } from "antd";

const getOnChange = (callback) => (page: number) => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log(window.location.search)
    queryParams.set('page', String(page));
    history.replaceState(null, '', "?" + queryParams.toString());
    callback(page)
}

export const CharacterTablePagination = ({ currentPage, setCurrentPage }) => <Pagination current={currentPage} total={82} onChange={getOnChange(setCurrentPage)} />