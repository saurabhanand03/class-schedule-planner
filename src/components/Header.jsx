import React from 'react'
import DarkModeToggle from './DarkModeToggle'

const Header = () => {
    return (
        <header className='flex justify-between items-center pt-2 pb-4 px-6 bg-'>
            <div className='flex-1'></div>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl lg:text-3xl text-center'>Class Schedule Planner</h1>
            <div className='flex-1 text-right'>
                <DarkModeToggle size={10}/>
            </div>
        </header>
    )
}

export default Header