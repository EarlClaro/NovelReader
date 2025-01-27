"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Book.module.css";

const AddBookForm = ({ onBookAdded }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "", // Added genre to bookData
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const genres = [
    "Horror",
    "Fantasy",
    "Mystery",
    "Science fiction",
    "Historical fantasy",
    "Romance",
    "Adventure fiction",
    "Literary fiction",
    "Historical",
    "Thriller",
    "Young adult",
    "Children's literature",
    "Contemporary literature",
    "Dystopian Fiction",
    "Fairy tale",
    "Magic realism",
    "Mystery and suspense",
    "Short story",
    "Western fiction",
    "Comedy",
    "Erotic thriller",
    "Romantic fantasy",
    "Gothic fiction",
    "Paranormal",
    "Fan-Fiction",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/books", bookData);
      console.log("Book added:", response.data);

      // Add the new book to the list
      onBookAdded(response.data);

      setIsModalVisible(false); // Close the modal after submission
      setBookData({ title: "", author: "", description: "", genre: "" }); // Reset form
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Add Book Card */}
      <div
        className={styles.bookCard}
        onClick={() => setIsModalVisible(true)}
      >
        <span className={styles.plusIcon}>+</span>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalVisible(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.header}>Add a New Book</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Title"
                value={bookData.title}
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Author"
                value={bookData.author}
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                className={styles.input}
              />
              <textarea
                placeholder="Description"
                value={bookData.description}
                onChange={(e) =>
                  setBookData({ ...bookData, description: e.target.value })
                }
                className={styles.textarea}
              />
              <select
                value={bookData.genre}
                onChange={(e) =>
                  setBookData({ ...bookData, genre: e.target.value })
                }
                className={styles.input}
              >
                <option value="">Select Genre</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <button type="submit" className={styles.submitButton}>
                Add Book
              </button>
            </form>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalVisible(false)}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBookForm;
