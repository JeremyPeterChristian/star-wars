import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components'
const { Footer, Content } = Layout;
import { QueryClient, QueryClientProvider } from "react-query";
import Table from '../components/Table/Table';
const queryClient = new QueryClient();
import Pagination from '../components/Pagination/Pagination';
import { usePaginationMetrics } from '../api/fetch';
import { useRouter } from 'next/router';
import Error from 'next/error'
import { handlePageMetrics } from '../utils/helpers'

const StyledContent = styled(Content)`
  padding:2em;
  height:90vh;
`

const StyledFooter = styled(Footer)`
  height:10vh;
`

const App: React.FC = () => {

  const { query, isReady } = useRouter();
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, isError, error, data } = usePaginationMetrics()

  // coalesce into undefined variables if there is no data
  const { pageLimit, count } = data ?? {}

  useEffect(() => handlePageMetrics(isLoading, pageLimit, query, setCurrentPage), [query, pageLimit, isLoading])

  if (isError) {
    return <Error statusCode={parseInt(error.message)} />
  }

  // wait for loading to complete and for router to resolve
  if (!isReady || isLoading) {
    return <div>loading...</div>
  }

  return <Layout>
    <StyledContent>
      <Table currentPage={currentPage} />
    </StyledContent>
    <StyledFooter>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={count ?? 0} />
    </StyledFooter>
  </Layout>
}

const Home = () => <QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

export default Home;