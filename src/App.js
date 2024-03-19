import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import VisitorLayout from './layouts/VisitorLayout';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<VisitorLayout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
