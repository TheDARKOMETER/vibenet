import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import VisitorLayout from './layouts/VisitorLayout';
import MainLayout from './layouts/MainLayout';
import AuthProvider from './contexts/AuthContext';
import { Dashboard, SignIn, Landing } from './pages';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/landing" element={<VisitorLayout />}>
            <Route index element={<Landing />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route exact path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
