import { handlePageMetrics } from './helpers';
jest.mock('next/router', () => {
  return {
    push: (args: any) => mockPush(args)
  };
});
const mockSetCurrentPage = jest.fn();
const mockPush = jest.fn();

describe('pagination component', () => {
  test('does not call if loading', async () => {
    handlePageMetrics(true, 1, {}, mockSetCurrentPage);
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
  test('calls with correct page number from query string', async () => {
    handlePageMetrics(false, 10, { page: '5' }, mockSetCurrentPage);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(5);
    expect(mockPush).not.toHaveBeenCalled();
  });
  test('defaults to 1 on query string error', async () => {
    handlePageMetrics(false, 1, { page: 'error' }, mockSetCurrentPage);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    expect(mockPush).toHaveBeenCalledWith({ query: { page: 1 } });
  });
  test('floors on too low page number', async () => {
    handlePageMetrics(false, 1, { page: '0' }, mockSetCurrentPage);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    expect(mockPush).toHaveBeenCalledWith({ query: { page: 1 } });
  });
  test('ceilings on too high page number', async () => {
    handlePageMetrics(false, 10, { page: '100' }, mockSetCurrentPage);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(10);
    expect(mockPush).toHaveBeenCalledWith({ query: { page: 10 } });
  });
});
