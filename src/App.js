import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path={"/"} element={<HomePage />}>
          <Route path="" element={<GamePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

//
