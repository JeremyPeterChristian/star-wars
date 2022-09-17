import React from "react";
import { Pagination } from "antd";
import Router from 'next/router';

const getOnChange = (callback: React.Dispatch<React.SetStateAction<number>>) => (page: number) => {
    Router.push({ query: { page } })
    callback(page)
}

interface CTPProps {
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const CharacterTablePagination = ({ currentPage, setCurrentPage }: CTPProps) => <Pagination
    current={currentPage}
    total={82}
    onChange={getOnChange(setCurrentPage)}
    showSizeChanger={false}
/>