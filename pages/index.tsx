import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components'
const { Footer, Content } = Layout;
import { QueryClient, QueryClientProvider } from "react-query";
import { CharacterTable } from './CharacterTable/CharacterTable';
const queryClient = new QueryClient();
import { CharacterTablePagination } from './CharacterTablePagination/CharacterTablePagination';

import { useRouter } from 'next/router';

const StyledContent = styled(Content)`
  color:red
`

const App: React.FC = () => {

  const { query, isReady } = useRouter();
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const page = parseInt(query?.page as string ?? '1');
    setCurrentPage(page)
  }, [query])

  if (!isReady) {
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