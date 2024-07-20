import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import VisitorLayout from './layouts/VisitorLayout';
import MainLayout from './layouts/MainLayout';
import AuthProvider from './contexts/AuthContext';
import { Post, Comment, CreatePost, UserSettings } from './components/index'


import { Dashboard, SignIn, Landing } from './pages';
import DevLayout from './layouts/DevLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route exact path="/landing" element={<VisitorLayout />}>
            <Route index element={<Landing />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route exact path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/dev" element={<DevLayout />}>
            <Route path="post" element={<Post />} />
            <Route path="comment" element={<Comment />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="usersettings" element={<UserSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
