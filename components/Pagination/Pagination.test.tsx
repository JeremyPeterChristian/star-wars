import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from './Pagination'
import React from 'react'
import userEvent from '@testing-library/user-event'


jest.mock("next/router", () => {
    return {
        push: jest.fn()
    }
})

const mockCallback = jest.fn()

describe('pagination component', () => {

    beforeEach(() => render(<Pagination currentPage={1} setCurrentPage={mockCallback} count={82} />))

    test('loads and displays', async () => {
        await screen.findByTestId('table-pagination')
    })

    test('correct page is highlighted', async () => {
        const activePage = await screen.findByTitle('1')
        expect(activePage).toHaveClass('ant-pagination-item-active')
    })

    test('previous button is disabled at first', async () => {
        const disabledButton = await screen.findByTitle('Previous Page')
        expect(disabledButton).toHaveClass('ant-pagination-disabled')
    })

    test('next button increments page number', async () => {
        const nextButton = await screen.findByTitle('Next Page')
        await userEvent.click(nextButton)
        expect(mockCallback).toHaveBeenCalledWith(2)
    })

})

describe('pagination component pre-set', () => {

    test('previous button decrements page number', async () => {
        render(<Pagination currentPage={2} setCurrentPage={mockCallback} count={82} />)
        const prevButton = await screen.findByTitle('Previous Page')
        await userEvent.click(prevButton)
        expect(mockCallback).toHaveBeenCalledWith(1)
    })

    test('next button is disabled at final page', async () => {
        render(<Pagination currentPage={9} setCurrentPage={mockCallback} count={82} />)
        const disabledButton = await screen.findByTitle('Next Page')
        expect(disabledButton).toHaveClass('ant-pagination-disabled')
    })
})