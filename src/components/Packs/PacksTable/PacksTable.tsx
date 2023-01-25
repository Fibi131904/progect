import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import { PackList } from './PacksUI/PackList/PackList';





export const PacksTable=()=>{
  const packs = useAppSelector(state => state.packs.cardPacks)
 

  return <div>
 <table>
 <thead>
  <tr>
 <th>
        <div >
            <div >Name</div>
            <div >
                <div >▲</div>
                <div>▼</div>
            </div>
        </div>
    </th>
 <th>
        <div >
            <div >Cards</div>
            <div >
                <div >▲</div>
                <div>▼</div>
            </div>
        </div>
    </th>
 <th>
        <div >
            <div >Updated</div>
            <div >
                <div >▲</div>
                <div>▼</div>
            </div>
        </div>
    </th>
 <th>
        <div >
            <div >Creator</div>
            <div >
                <div >▲</div>
                <div>▼</div>
            </div>
        </div>
    </th>
    <th>
      Action
    </th>
  </tr>
  </thead>
 
 <tbody>
  <PackList cardPacks={packs}/>
  <tr>
   <td>
     <div>
    Paginator
    </div>
    </td>
  </tr>
 </tbody>
</table>
</div>
}


