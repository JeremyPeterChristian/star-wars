import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CharacterTablePagination } from './CharacterTablePagination'
import React from 'react'

test('loads and displays', async () => {

    render(<CharacterTablePagination currentPage={1} setCurrentPage={() => { }} />)

    await screen.findByTestId('table-pagination')
})