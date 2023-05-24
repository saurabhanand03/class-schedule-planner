import React from 'react'
import DarkModeToggle from './DarkModeToggle'

const Header = () => {
    return (
        <header className='flex justify-between items-center pt-2 pb-4 px-6 bg-'>
            <div className='flex-1'></div>
            <div className='flex-2'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-center'>Class Schedule Planner</h1>
            </div>
            <div className='flex-1 text-right'>
                <DarkModeToggle />
            </div>
        </header>
    )
}

export default Header