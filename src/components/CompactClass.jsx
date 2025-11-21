import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import Window from './Window'

const CompactClass = ({ classItem, index }) => {
    const [show, setShow] = useState(false);
    const onOpen = () => {
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }

    return (
        <div className="w-full">
            <Draggable key={classItem.code} draggableId={classItem.code} index={index}>
                {(provided) => (
                    <div className="flex w-full rounded-md hover:bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-700 p-1" onClick={onOpen} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className='flex-1 flex'>
                            <h2 className="font-bold basis-1/6">{classItem.code}</h2>
                            <p className="font-semibold flex-1">{classItem.name}</p>
                        </div>
                        <div className=''>
                            <p className="font-semibold">Credits: {classItem.credits}</p>
                        </div>
                    </div>
                )}
            </Draggable>
            <Window classItem={classItem} onClose={closeModal} show={show}/>
        </div>
    );
}

export default CompactClass