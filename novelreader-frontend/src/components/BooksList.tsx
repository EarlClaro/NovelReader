"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BooksList.module.css"; // Importing the CSS module for styling

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Book List</h2>
      <div className={styles.grid}>
        {books.slice(0, 10).map((book) => (
          <div key={book.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{book.title}</h3>
              <p className={styles.cardAuthor}>{book.author}</p>
              <p className={styles.cardDescription}>
                {book.description.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
