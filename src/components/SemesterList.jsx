import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { classList } from '../data/classes';
import Semester from "./Semester";

const SemesterList = () => {
    const [classes, updateClasses] = useState(classList);

    const [semesters, setSemesters] = useState({
        semester1: [],
        semester2: [],
        semester3: [],
        semester4: [],
        semester5: [],
        semester6: [],
        semester7: [],
        semester8: [],
        semester9: [],
        semester10: [],
        semester11: [],
        semester12: [],
        unassigned: classes,
    });

    // const [semesters, setSemesters] = useState([new Array(9).fill([]).concat(classes)]);

    const [calendarMode, setCalendarMode] = useState(false);
    const toggleCalendarMode = () => setCalendarMode(!calendarMode);

    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [startSemester, setStartSemester] = useState( new Date().getMonth() < 5 ? 0 : 
                                                        new Date().getMonth() < 7 ? 1 : 2);

    const increaseStartSemester = () => startSemester < 2 ? (
        setStartSemester(startSemester + 1)
    ) : (
        setStartSemester(0),
        setStartYear(startYear + 1)
    );
    const decreaseStartSemester = () => startSemester > 0 ? (
        setStartSemester(startSemester - 1)
    ) : (
        setStartSemester(2),
        setStartYear(startYear - 1)
    );

    function handleOnDragEnd(result) {
        const { source, destination } = result;

        // Check if class dropped outside a droppable area
        if (!destination) {
        return
        };

        // Reorder classes within the same semester
        if (source.droppableId === destination.droppableId) {
        const semester = semesters[source.droppableId];
        const reorderedClasses = Array.from(semester);
        const [draggedClass] = reorderedClasses.splice(source.index, 1);
        reorderedClasses.splice(destination.index, 0, draggedClass);

        setSemesters({
            ...semesters,
            [source.droppableId]: reorderedClasses,
        });
        }

        // Move class between semesters
        else {
        const sourceSemester = semesters[source.droppableId];
        const destinationSemester = semesters[destination.droppableId];
        const [draggedClass] = sourceSemester.splice(source.index, 1);
        destinationSemester.splice(destination.index, 0, draggedClass);

        setSemesters({
            ...semesters,
            [source.droppableId]: sourceSemester,
            [destination.droppableId]: destinationSemester,
        });
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex">
            <div className="flex-1 ml-6 mr-3">
                {Object.keys(semesters).slice(0, -1).map((semesterId, index) => {
                return (
                    <Semester
                    key={semesterId}
                    id={semesterId}
                    semesterClasses={semesters[semesterId]}
                    semesterIndex={index}
                    calendarMode={calendarMode}
                    toggleCalendarMode={toggleCalendarMode}
                    startingSemester={[startSemester, startYear]}
                    increaseStartSemester={increaseStartSemester}
                    decreaseStartSemester={decreaseStartSemester}
                    />
                );
                }
                )}
            </div>
            <div className="flex-1 ml-3 mr-6">
                <Semester id="unassigned" heading="Unassigned Classes" semesterClasses={semesters.unassigned} />
            </div>
            </div>
        </DragDropContext>
    );
}

export default SemesterList;