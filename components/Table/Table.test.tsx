import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Table from './Table'
import React from 'react'
import { useCharacters } from '../../api/fetch'

jest.mock("../../api/fetch", () => {
    return {
        useCharacters: jest.fn(() => ({ isLoading: false }))
    }
})

describe('table component', () => {

    test('calls endpoint with page number', async () => {
        render(<Table currentPage={1} />)
        expect(useCharacters).toHaveBeenCalledWith(1)
    })

})

