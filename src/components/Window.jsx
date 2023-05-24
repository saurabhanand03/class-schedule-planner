import React from 'react'
import Modal from 'react-modal'
import { TbX } from 'react-icons/tb'

Modal.setAppElement('#root')

const Window = ({ show, onClose, classItem }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className='flex rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-700 text-slate-900 dark:text-slate-100 outline-none m-12 w-80 p-5 h-44 overflow-auto'
            overlayClassName='flex justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/50'>
            <div className='flex-1'>
                <h2 className="text-center text-lg font-bold">{classItem.code}</h2>
                <p><span className='font-bold'>Class Name:</span> {classItem.name}</p>
                <p><span className='font-bold'>Credits:</span> {classItem.credits}</p>
                <p><span className='font-bold'>Prereqs:</span> {classItem.prereqs.length > 0 ? classItem.prereqs.join(', ') : 'None'}</p>
            </div>
            <button className="flex justify-center items-center h-8 w-8 rounded-md bg-slate-500 hover:bg-slate-700" onClick={onClose}><TbX /></button>
        </Modal>
    )
}

export default Window