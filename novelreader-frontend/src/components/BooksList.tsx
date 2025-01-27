"use client";

import React, { useState, useEffect } from "react";
import AddBookForm from "../components/AddBookForm";
import styles from "./Book.module.css";

const BookList = () => {
  const [books, setBooks] = useState([]); 
  const [isAdding, setIsAdding] = useState(false); 

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

  return (
    <div className={styles.bookListContainer}>
      <div className={styles.bookList}>
        {/* Render all book cards, and show the AddBookForm card conditionally */}
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
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
            <span style={{color:"grey"}}>Add new book</span>
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
