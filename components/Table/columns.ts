import { ColumnsType } from 'antd/lib/table';
import { Character } from '../../utils/types';

// takes a string and returns 0 if it cannot be parsed into a float
const forceFloat = (numString: string) => {
  const commaFloat = numString.replace(/,/g, '');
  const maybeFloat = parseFloat(commaFloat);
  return isNaN(maybeFloat) ? 0 : maybeFloat;
};

// configuration object for table component
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
    sorter: (a, b) => forceFloat(a.mass) - forceFloat(b.mass)
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    responsive: ['lg']
  },
  {
    responsive: ['lg'],
    title: 'Hair Color',
    dataIndex: 'hair_color',
    key: 'hair_color'
  },
  {
    responsive: ['lg'],
    title: 'Skin Color',
    dataIndex: 'skin_color',
    key: 'skin_color'
  },
  {
    responsive: ['lg'],
    title: 'Eye Color',
    dataIndex: 'eye_color',
    key: 'eye_color'
  },
  {
    responsive: ['lg'],
    title: 'Birth Year',
    dataIndex: 'birth_year',
    key: 'birth_year'
  },
  { responsive: ['lg'], title: 'Gender', dataIndex: 'gender', key: 'gender' }
];
