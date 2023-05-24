import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import { useState } from 'react';
import { classList } from './data/classes';
import Semester from "./components/Semester";
import Header from './components/Header';

function App() {
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

  const [startingYear, setStartingYear] = useState(new Date().getFullYear());
  const increaseStartYear = () => setStartingYear(startingYear + 1);
  const decreaseStartYear = () => setStartingYear(startingYear - 1);

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
    <div className="bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 select-none">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Header />
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
                  startingYear={startingYear}
                  increaseStartYear={increaseStartYear}
                  decreaseStartYear={decreaseStartYear}
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
    </div>
  );
}

export default App;
