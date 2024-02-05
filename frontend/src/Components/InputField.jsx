import React from 'react'

const InputField = ({value, label, placeholder, onChangeHandler}) => {

  return (
    <div className='flex flex-col'>
        <label className='text-sm font-medium text-left py-2' >{label}</label>
        <input value = {value} onChange={onChangeHandler} placeholder= {placeholder} type='text' className= 'border rounded-md border-slate-300 focus:outline-none focus:border-gray-600  pl-2 h-8'/>
    </div>
  )
}

export default InputField