import { useState, useEffect } from 'react'
import { TbLayoutList, TbList } from 'react-icons/tb'

const CompactViewToggle = ({ size, compactView, toggleCompactView }) => {
    return (
        <button className='p-2.5 rounded-md bg-gray-300 dark:bg-gray-700' onClick={toggleCompactView}>
            {compactView ? <TbLayoutList size={size}/> : <TbList size={size}/>}
        </button>
    )
}

export default CompactViewToggle