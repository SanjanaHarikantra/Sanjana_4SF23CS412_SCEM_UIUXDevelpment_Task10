
// App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded pages (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const AddBookPage = lazy(() => import('./pages/AddBookPage'));
const EditBookPage = lazy(() => import('./pages/EditBookPage'));
const BookDetailsPage = lazy(() => import('./pages/BookDetailsPage'));

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 min-h-screen">
        <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
