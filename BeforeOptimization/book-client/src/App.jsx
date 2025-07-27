
import React from 'react'; // 
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import Navbar from './components/Navbar';
import EditBookPage from './pages/EditBookPage'; 
import BookDetailsPage from "./pages/BookDetailsPage";
import Footer from './components/Footer'


function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/book-details/:id" element={<BookDetailsPage />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
