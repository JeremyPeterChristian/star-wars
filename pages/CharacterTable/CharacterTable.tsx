import React from 'react';
import { useCharacters } from '../../api/fetch'
import { Skeleton, Table } from 'antd';
import { columns } from './columns'

export const CharacterTable = ({ currentPage }: { currentPage: number }) => {

    const { isLoading, isError, data } = useCharacters(currentPage)

    if (isLoading) return <Skeleton />

    return <Table dataSource={data?.results} columns={columns} pagination={{ hideOnSinglePage: true }} />

}