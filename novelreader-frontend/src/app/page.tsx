'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// BookCard Component to display individual book
const BookCard = ({ book, onDelete }: { book: any, onDelete: (id: string) => void }) => (
  <div className="card">
    <img src={book.coverImage || '/default-cover.jpg'} alt={book.title} className="cover-image" />
    <div className="book-details">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onDelete(book._id)} className="delete-btn">Delete</button>
    </div>
  </div>
);

// Main Page Component
const BookLibrary = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch books from backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Handle book upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('book', file);

      try {
        await axios.post('http://localhost:3000/api/books/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFile(null);
        // Refetch books after upload
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error uploading book:', error);
      }
    }
  };

  // Handle delete book
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="book-library">
      <h1>NovelReader</h1>
      <h2>Book Library</h2>
      
      <div className="upload-section">
        <input type="file" accept="application/pdf, image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>Upload Book</button>
      </div>

      <div className="books-container">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookLibrary;
