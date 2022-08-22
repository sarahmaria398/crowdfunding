import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import CreateProjectPage from './pages/CreateProjectPage';
import RegisterPage from './pages/RegisterPage';
import "./App.css";
import UpdateProjectPage from './pages/UpdateProjectPage';

function App() {
  return (
    <Router>
      <div >
        <Nav />
        <Routes >
          <Route exact path="/" element={<HomePage />}>
          </Route>
          <Route path="/login" element={<LoginPage />} >
          </Route>
          <Route exact path="/projects/:id" element={<ProjectPage />}>
          </Route>
          <Route exact path="/create-project" element={<CreateProjectPage />}>
          </Route>
          <Route exact path="/register" element={<RegisterPage />}>
          </Route>
          <Route exact path="/update-project" element={<UpdateProjectPage />}>
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
