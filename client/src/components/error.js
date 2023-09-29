import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <>
    <div className='main-heading'>
      <p>404</p>
      <NavLink to='/home'>Back</NavLink>
    </div></>

  )
}
