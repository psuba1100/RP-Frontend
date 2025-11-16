import { Routes, Route } from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashLayout from './components/layouts/DashLayout';
import U from './pages/U';
import RequireAuth from './components/auth/RequireAuth';
import Tasks from './pages/Tasks';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/*Public routes*/}
        <Route index element={<Home />} />
        <Route path='login' index element={<Login />} />
        <Route path='register' index element={<Register />} />

        {/*Protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path='u' element={<DashLayout />}>
            <Route index element={<U />} />

            <Route path='utilities' />
            <Route path='flashcards' />
            <Route path='tasks' index element={<Tasks/>}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;