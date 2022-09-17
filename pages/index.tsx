import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components'
const { Footer, Content } = Layout;
import { QueryClient, QueryClientProvider } from "react-query";
import { CharacterTable } from './CharacterTable/CharacterTable';
const queryClient = new QueryClient();
import { CharacterTablePagination } from './CharacterTablePagination/CharacterTablePagination';
import { usePaginationMetrics } from '../api/fetch';
import { useRouter } from 'next/router';
import Router from 'next/router';

const StyledContent = styled(Content)`
  color:red
`

const App: React.FC = () => {

  const { query, isReady } = useRouter();
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, isError, data: pageLimit } = usePaginationMetrics()

  useEffect(() => {
    if (!isLoading && pageLimit) {
      const page = parseInt(query?.page as string ?? '1');
      if (page > pageLimit) {
        Router.push({ query: { page: pageLimit } })
        setCurrentPage(pageLimit)
      } else if (page < 1) {
        Router.push({ query: { page: 1 } })
        setCurrentPage(1)
      } else {
        setCurrentPage(page)
      }
    }
  }, [query, pageLimit, isLoading])

  if (!isReady || isLoading) {
    return <div>loading...</div>
  }

  return <Layout>
    <StyledContent>
      <CharacterTable currentPage={currentPage} />
    </StyledContent>
    <Footer>
      <CharacterTablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Footer>
  </Layout>
}

const Home = () => <QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

export default Home;