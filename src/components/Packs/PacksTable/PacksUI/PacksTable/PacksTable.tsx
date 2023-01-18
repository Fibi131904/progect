import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  name: string;
  lastUpdated: number,
  cards: number;
  createdBy: string;
  
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John',
    lastUpdated: 1,
    cards: 32,
    createdBy: 'New York No. 1 Lake Park',
   
  },
  {
    key: '2',
    name: 'Jim',
    lastUpdated: 2,
    cards: 42,
    createdBy: 'London No. 1 Lake Park',
   
  },
  {
    key: '3',
    name: 'Joe',
    lastUpdated: 3,
    cards: 32,
    createdBy: 'Sidney No. 1 Lake Park',
   
  },
];

export const PacksTable: React.FC = () => (
  <Table dataSource={data}>
    <ColumnGroup >
      <Column title=" Name" dataIndex="name" key="name" />
      
    </ColumnGroup>
    <Column title="Cards" dataIndex="cards" key="cards" />
    <Column title="Last Updated" dataIndex="lastUpdated" key="lastUpdated" />
    <Column title="Created by" dataIndex="createdBy" key="createdBy" />
   
    <Column
      title="Action"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
         
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);