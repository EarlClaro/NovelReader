"use client";

import React, { useState, useEffect } from "react";
import AddBookForm from "../components/AddBookForm";
import styles from "./Book.module.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [activeBookId, setActiveBookId] = useState(null); // New state to track the active book

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Function to add a new book and refresh the list
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setIsAdding(false);
  };

  // Handle book card click to display details
  const handleBookClick = (bookId) => {
    setActiveBookId((prevBookId) => (prevBookId === bookId ? null : bookId)); // Toggle the active book
  };

  return (
    <div className={styles.bookListContainer}>
      <div className={styles.bookList}>
        {/* Render all book cards */}
        {books.map((book) => (
          <div
            key={book.id}
            className={`${styles.bookCard} ${activeBookId === book.id ? styles.activeCard : ""}`}
            onClick={() => handleBookClick(book.id)}
          >
            {/* Show either the title or the full details based on the activeBookId */}
            {activeBookId === book.id ? (
              <div className={styles.bookDetails}>
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
              </div>
            ) : (
              <h3>{book.title}</h3>
            )}
          </div>
        ))}

        {/* Add Book Card - Show AddBookForm on click */}
        {!isAdding && (
          <div
            className={styles.addBookCard}
            onClick={() => setIsAdding(true)}
            title="Add new book" // Set isAdding to true to show AddBookForm
          >
            <span className={styles.plusIcon}>+</span>
          </div>
        )}

        {/* Show AddBookForm when isAdding is true */}
        {isAdding && (
          <div className={styles.addBookCard}>
            <AddBookForm onBookAdded={handleAddBook} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
