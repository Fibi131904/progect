import React, { useEffect, useState } from 'react';
import {  Table, Popconfirm, Button } from 'antd';

import { instance } from '../../../api/instance';



export const PacksTable=()=>{
  const [gridData, setGridData]=useState([])
const [loading, setLoading]=useState(false)

useEffect(()=>{
  loadData()
},[])

const loadData=async()=>{
  setLoading(true)
  const response= await instance.get('cards/pack')
  setGridData(response.data.cardPacks)
  console.log(response.data)
  setLoading(false)
}
const dataWithAge = gridData.map((item)=>({
  //@ts-ignore
  ...item,
   age: Math.floor(Math.random() * 6 )+ 20
    }))
const modifieData=dataWithAge.map(({body,...item})=>({
...item,
key: item._id,
message: body,

}))
console.log('modifieData', modifieData)
const handleDelete=(value:any)=>{
  const dataSource=[...modifieData]
  const filterData= dataSource.filter((item)=>item._id !== value._id)
    //@ts-ignore
setGridData(filterData)
}
const columns=[

{
  title:'Name',
dataIndex: 'name',
align:'center',
},

{
  title:'Cards',
dataIndex: 'cardsCount',
align:'center',
},

{
  title:'last Updated',
dataIndex: 'updated',
align:'center',
},

{title:'Created by',
dataIndex: 'user_name',
align:'center',
},

{
  title:'Action',
dataIndex: 'action',
align:'center',
render:(_:any, record:any)=>
modifieData.length>=1? (
  <Popconfirm title='Are you sure want to delete?'onConfirm={()=>handleDelete(record)}>
<Button danger type='primary'>Delete</Button>
  </Popconfirm>
): null,
},
]

  return (<div>

<Table 
  //@ts-ignore
columns={columns}
dataSource={modifieData}
bordered
loading={loading}/>

  </div>
)}




// const { Column, ColumnGroup } = Table;

// // interface DataType {
// //   key: React.Key;
// //   name: string;
// //   lastUpdated: number,
// //   cards: number;
// //   createdBy: string;
  
// // }


//   // const userId = useAppSelector(state => state.profile._id)
//   // const status = useAppSelector((state) => state.app.status)

// // const data: DataType[] = [
// //   {
// //     key: '1',
// //     name: 'John',
// //     lastUpdated: 1,
// //     cards: 32,
// //     createdBy: 'New York No. 1 Lake Park',
   
// //   },
// //   {
// //     key: '2',
// //     name: 'Jim',
// //     lastUpdated: 2,
// //     cards: 42,
// //     createdBy: 'London No. 1 Lake Park',
   
// //   },
// //   {
// //     key: '3',
// //     name: 'Joe',
// //     lastUpdated: 3,
// //     cards: 32,
// //     createdBy: 'Sidney No. 1 Lake Park',
   
// //   },
// // ];

// export const PacksTable: React.FC = () => {
// const packs = useAppSelector(state => state.packs.cardPacks)
//   return (
    
//        <Table dataSource={packs}>
        
//       <ColumnGroup >
//         <Column title=" Name" dataIndex="name" key="name" />
        
//       </ColumnGroup>
     
//       <Column title="Cards" dataIndex="cards" key="cards" />
//       <Column title="Last Updated" dataIndex="lastUpdated" key="lastUpdated" />
//       <Column title="Created by" dataIndex="createdBy" key="createdBy" />
     
//       <Column
//         title="Action"
//         key="action"
//         render={(_: any, record:any) => (
//           <Space size="middle">
           
//             <a>Delete</a>
//           </Space>
//         )}
//       />
//     </Table>
 
// )
//         }  