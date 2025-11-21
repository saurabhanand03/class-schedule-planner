import './App.css';
import Header from './components/Header';
import SemesterList from './components/SemesterList';

function App() {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 select-none">
      <Header />
      <SemesterList />
    </div>
  );
}

export default App;
