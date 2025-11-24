import { Routes, Route } from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashLayout from './components/layouts/DashLayout';
import U from './pages/U';
import RequireAuth from './components/auth/RequireAuth';
import Tasks from './pages/Tasks';
import CreateFlashcard from './pages/CreateFlashcard';
import Flashcards from './pages/Flashcards';
import Flashcard from './pages/Flashcard';
import FlashcardLayout from './components/layouts/FlashcardLayout';
import Hub from './pages/Hub';

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

            <Route path='flashcard' element={<FlashcardLayout />} >
              <Route path=':flashcardId' index element={<Flashcard />} />
            </Route>
            <Route path='hub' index element={<Hub />} />
            <Route path='flashcards' index element={<Flashcards />} />
            <Route path='tasks' index element={<Tasks />} />
            <Route path='create' index element={<CreateFlashcard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;