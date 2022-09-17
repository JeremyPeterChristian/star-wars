import { ColumnsType } from 'antd/lib/table';
import { Character } from '../../types';

export const columns: ColumnsType<Character> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass'
  }
];
