import { Search } from 'lucide-react'
import React from 'react'

export default function SearchChatPeople() {
  return (
   <div className="searchchat flex items-center justify-center ">
    <div className="searchchatframe flex items-center justify-center w-[100%]">
        <input className='searchchatpeople' type="text" placeholder='Search Other People..' /> <Search></Search>
    </div>
   </div>
  )
}
