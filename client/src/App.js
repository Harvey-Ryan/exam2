
import './App.css';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditForm from './components/EditForm';
import NewPet from './components/NewPet';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/api" element={<DisplayAll />} />
          <Route path={"/api/pets/:id"}element={<DisplayOne />} />
          <Route path={"/api/pets/:id/edit"} element={<EditForm />} />
          <Route path={"/api/pets/new"} element={<NewPet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
