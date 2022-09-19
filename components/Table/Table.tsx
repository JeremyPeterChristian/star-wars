import React, { useState, useEffect } from 'react';
import { useCharacters } from '../../api/fetch'
import { Table as AntTable } from 'antd';
import { columns } from './columns'
import { Character } from '../../utils/types';

const Table = ({ currentPage }: { currentPage: number }) => {

    const { isLoading, data } = useCharacters(currentPage)
    const [results, setResults] = useState<Character[]>([])

    // don't pass the fetch results straight to the table
    useEffect(() => {
        // wait until we're done loading
        if (!isLoading && data?.results) {
            // then update the table's state to refresh the data 
            setResults(data.results)
        }
    }, [isLoading, data])

    return <AntTable loading={isLoading} dataSource={results} columns={columns} pagination={{ hideOnSinglePage: true }} />

}

export default Table