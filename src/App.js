import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Task from './components/Task';
import { ProtectedRoute } from './components/ProtectedRoute'
import Profile from './components/Profile';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffcc80',
      },

    },
  });


  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
