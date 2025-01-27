"use client";

import { useEffect, useState } from "react";
import ePub from "epubjs"; // Corrected import for epub.js

const BooksList = () => {
  const [books, setBooks] = useState<any[]>([]); // List of books
  const [currentBook, setCurrentBook] = useState<any>(null); // Current book being viewed

  useEffect(() => {
    // Fetch books metadata from the backend
    const fetchBooks = async () => {
      const res = await fetch("http://localhost:3001/books"); // Get books metadata from the backend
      if (res.ok) {
        const data = await res.json();
        setBooks(data); // Set the books data
      } else {
        console.error("Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  // Function to load the selected EPUB file
  const loadBook = (bookUrl: string) => {
    const book = ePub(bookUrl); // Load the EPUB book
    setCurrentBook(book); // Set the current book
  };

  // Render the EPUB content
  useEffect(() => {
    if (currentBook) {
      currentBook.renderTo("book-container"); // Render EPUB content to the container
    }
  }, [currentBook]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Books</h2>
      <ul className="space-y-4">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book: any) => (
            <li key={book.title} className="border p-4 rounded-lg">
              <h3 className="text-xl">{book.title}</h3>
              <p className="text-sm">{book.author}</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => loadBook(book.fileUrl)} // On click, load the selected book
              >
                Read {book.fileType.toUpperCase()} Book
              </button>
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>

      {currentBook && (
        <div
          id="book-container"
          className="my-4 p-4 border border-gray-300 rounded"
          style={{ width: "100%", height: "600px", overflowY: "scroll" }}
        >
          
        </div>
      )}
    </div>
  );
};

export default BooksList;
