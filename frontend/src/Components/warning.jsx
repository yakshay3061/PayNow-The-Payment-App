import React from 'react'
import {Link} from 'react-router-dom'


const Warning = ({title, link, to}) => {
  return (
    <div className='text-center'> 
      <strong className='font-normal'>{title}</strong>
      <Link to = {link} className='underline font-light'>{to}</Link>
    </div>
  )
}

export default Warning