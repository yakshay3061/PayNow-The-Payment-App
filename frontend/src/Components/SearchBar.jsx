import React from 'react'

const SearchBar = ({OnChangeHandler}) => {
  return (
    <div className='my-3'>
        <input onChange={OnChangeHandler} placeholder= "Search users..." type='text' className= 'w-full border rounded-md border-slate-300 focus:outline-none focus:border-gray-600  pl-2 h-8'/>
    </div>
  )
}

export default SearchBar