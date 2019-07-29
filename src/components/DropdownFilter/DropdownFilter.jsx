import React from 'react'

export default ({dropDownOptions, handleSelect}) => (
    <select className='dropdown'  onChange={handleSelect}>
    {dropDownOptions && dropDownOptions.map(option =>{
        return <option>{option}</option>
    })}
  </select>
)