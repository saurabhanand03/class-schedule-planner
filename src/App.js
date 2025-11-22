import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import SemesterList from './components/SemesterList';
import Cookies from 'js-cookie';

function App() {
  const [compactView, setCompactView] = useState(Cookies.get('compactView') === 'true' ? true : false);
  const toggleCompactView = () => {
    setCompactView(!compactView);
    Cookies.set('compactView', !compactView);
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 select-none">
      <Header compactView={compactView} toggleCompactView={toggleCompactView} />
      <SemesterList compactView={compactView} />
    </div>
  );
}

export default App;
