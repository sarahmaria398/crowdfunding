import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div >
        <Nav />
        <Routes >
          <Route exact path="/" element={<HomePage />}>
          </Route>
          <Route exact path="/project" element={<ProjectPage />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
