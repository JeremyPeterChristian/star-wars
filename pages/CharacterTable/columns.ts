import { ColumnsType } from 'antd/lib/table';
import { Character } from '../../types';

const forceInt = (numString: string) => {
  let maybeInt = parseInt(numString);
  return isNaN(maybeInt) ? 0 : maybeInt;
};

export const columns: ColumnsType<Character> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass',
    sorter: (a, b) => forceInt(a.mass) - forceInt(b.mass)
  }
];
