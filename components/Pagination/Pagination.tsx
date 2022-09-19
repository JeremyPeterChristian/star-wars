import React from "react";
import { Pagination as AntPagination } from "antd";
import Router from 'next/router';

const getOnChange = (callback: React.Dispatch<React.SetStateAction<number>>) => (page: number) => {
    Router.push({ query: { page } })
    callback(page)
}

interface CTPProps {
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    count: number
}

const Pagination = ({ currentPage, setCurrentPage, count }: CTPProps) => <AntPagination
    data-testid='table-pagination'
    current={currentPage}
    total={count}
    onChange={getOnChange(setCurrentPage)}
    showSizeChanger={false}
/>

export default Pagination