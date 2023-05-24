import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import Class from "../components/Class";
// import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi'
import { Tb123, TbSortAscendingNumbers, TbCalendar, TbChevronLeft, TbChevronRight } from 'react-icons/tb'

const Semester = ({ id, semesterClasses, semesterIndex, calendarMode, toggleCalendarMode, startingYear, increaseStartYear, decreaseStartYear }) => {

    const semesterNames = ['Spring', 'Summer', 'Fall'];

    const semesterName = calendarMode ? semesterNames[(semesterIndex+1) % 3] + ' ' + (startingYear + Math.floor((semesterIndex+1) / 3)) : 'Semester ' + parseInt(id.replace('semester', ''));

    const totalSemesterCredits = semesterClasses.reduce((accumulator, currClass) => accumulator + currClass.credits, 0);

    return (
        <div>
            <div className='flex items-end mt-2 font-bold tracking-tight px-6'>
                <div className='flex-1'>
                    {semesterIndex == 0 ?
                        <div onClick={toggleCalendarMode}>
                            {calendarMode ? <TbCalendar size={28} /> : <TbSortAscendingNumbers size={28} />}
                        </div>
                        : <></>
                    }
                </div>
                <h3 className='flex-2 text-lg text-center flex'>
                    {calendarMode && semesterIndex == 0 ? <TbChevronLeft size={28} className='mx-4' onClick={decreaseStartYear}/> : <></>}
                    {semesterName}
                    {calendarMode && semesterIndex == 0 ? <TbChevronRight size={28} className='mx-4' onClick={increaseStartYear}/> : <></>}
                </h3>
                <div className='flex-1'>
                    <h3 className='text-sm text-slate-600 dark:text-slate-400 text-right'>Total Credits: {totalSemesterCredits}</h3>
                </div>
            </div>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 min-h-[70px] rounded-md p-3 space-y-3" ref={provided.innerRef} {...provided.droppableProps}>
                        {semesterClasses.map((classItem, index) => {
                            return (
                                <Class key={classItem.code} classItem={classItem} index={index} />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Semester