import { useState, useEffect } from 'react'
import { TbMoon, TbMoonFilled } from 'react-icons/tb'

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const toggleTheme = () => setDarkMode(!darkMode);

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <button className='p-2.5 rounded-md bg-gray-300 dark:bg-gray-700' onClick={toggleTheme}>
            {darkMode ? <TbMoon size={16}/> : <TbMoonFilled size={16}/>}
        </button>
    )
}

export default DarkModeToggle