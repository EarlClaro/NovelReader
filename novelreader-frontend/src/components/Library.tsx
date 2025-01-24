// src/components/Library.tsx
import React from 'react';

const Library: React.FC = () => {
  // Example static list of books, you will replace this with data from your backend
  const books = [
    { title: 'Book 1', image: '/book1.jpg' },
    { title: 'Book 2', image: '/book2.jpg' },
    { title: 'Book 3', image: '/book3.jpg' },
  ];

  return (
    <div className="library">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Library;
