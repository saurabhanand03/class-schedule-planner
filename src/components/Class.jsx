import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import Window from './Window'

const Class = ({ classItem, index }) => {
    const [show, setShow] = useState(false);
    const onOpen = () => {
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }

    return (
        <div className="w-80 text-center">
            <Draggable key={classItem.code} draggableId={classItem.code} index={index}>
                {(provided) => (
                    <div className="flex w-full rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-700 p-2" onClick={onOpen} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className='flex-1'>
                            <h2 className="text-lg font-bold">{classItem.code}</h2>
                            <p className="font-semibold">{classItem.name}</p>
                        </div>
                        <div className='flex items-center'>
                            <p className="font-semibold">{classItem.credits}</p>
                        </div>
                    </div>
                )}
            </Draggable>
            <Window classItem={classItem} onClose={closeModal} show={show}/>
        </div>
    );
}

export default Class