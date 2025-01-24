import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Library: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Library</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {books.map((book) => (
          <div key={book.filePath} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={`http://localhost:3001/${book.filePath}`} alt={book.title} width="100" />
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
