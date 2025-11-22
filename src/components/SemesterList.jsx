import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import classes from '../data/GT_Classes_2.json';
import Semester from "./Semester";
import Cookies from 'js-cookie';

const SemesterList = ({ compactView }) => {
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

    useEffect(() => {
        if (!Cookies.get('semester1')) {
            Object.entries(semesters).slice(0,-1).forEach(([semesterId, semesterClasses]) => {
                Cookies.set(semesterId, JSON.stringify(semesterClasses.map(classItem => classItem.code)));
            });
            console.log('Initial class data saved to Cookies.');
            console.log(Cookies.get());
        } else {
            Object.keys(semesters).slice(0,-1).forEach((semesterId) => {
                const classCodes = JSON.parse(Cookies.get(semesterId));
                const semesterClasses = classCodes.map(code => 
                    classes.find(classItem => classItem.code === code)
                ).filter(classItem => classItem !== undefined);
                console.log(`${semesterId}:`, semesterClasses);
                
                setSemesters(prevSemesters => ({
                    ...prevSemesters,
                    [semesterId]: semesterClasses,
                    unassigned: prevSemesters.unassigned.filter(classItem => !classCodes.includes(classItem.code)),
                }));
            });
        }

        console.log('Semesters after loading from Cookies:', semesters);
    }, []);

    const [calendarMode, setCalendarMode] = useState(Cookies.get('calendarMode') === 'true' ? true : false);
    const toggleCalendarMode = () => {
        setCalendarMode(!calendarMode);
        Cookies.set('calendarMode', !calendarMode);
    };

    const [startYear, setStartYear] = useState(Cookies.get('startYear') ? 
                                            parseInt(Cookies.get('startYear')) :
                                            new Date().getFullYear());
    const [startSemester, setStartSemester] = useState(Cookies.get('startSemester') ? 
                                                    parseInt(Cookies.get('startSemester')) : 
                                                    (
                                                        new Date().getMonth() < 5 ? 0 : 
                                                        new Date().getMonth() < 7 ? 1 : 
                                                        2
                                                    ));

    const increaseStartSemester = () => startSemester < 2 ? (
        setStartSemester(startSemester + 1),
        Cookies.set('startSemester', startSemester + 1)
    ) : (
        setStartSemester(0),
        setStartYear(startYear + 1),
        Cookies.set('startSemester', 0),
        Cookies.set('startYear', startYear + 1)
    );
    const decreaseStartSemester = () => startSemester > 0 ? (
        setStartSemester(startSemester - 1),
        Cookies.set('startSemester', startSemester - 1)
    ) : (
        setStartSemester(2),
        setStartYear(startYear - 1),
        Cookies.set('startSemester', 2),
        Cookies.set('startYear', startYear - 1)
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

            // Update Cookies
            Object.entries(semesters).slice(0,-1).forEach(([semesterId, semesterClasses]) => {
                Cookies.set(semesterId, JSON.stringify(semesterClasses.map(classItem => classItem.code)));
            });
        }

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex gap-6 mx-6">
            <div className="flex-1">
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
                        compactView={compactView}
                    />
                );
                }
                )}
            </div>
            <div className="flex-1">
                <Semester 
                    id="unassigned"
                    heading="Unassigned Classes"
                    semesterClasses={semesters.unassigned} 
                    compactView={compactView}
                />
            </div>
            </div>
        </DragDropContext>
    );
}

export default SemesterList;