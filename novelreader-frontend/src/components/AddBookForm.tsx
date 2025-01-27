"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./AddBookForm.module.css"; // Importing the CSS module for styling

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // State to control visibility of the form

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/books",
        bookData
      );
      console.log("Book added:", response.data);
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.addButton}
        onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
      >
        {isFormVisible ? "Cancel" : "Add Book"}
      </button>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <h2 className={styles.header}>Add a New Book</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                className={styles.input}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Author"
                value={bookData.author}
                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                className={styles.input}
              />
            </div>
            <div>
              <textarea
                placeholder="Description"
                value={bookData.description}
                onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                className={styles.textarea}
              />
            </div>
            <div>
              <button type="submit" className={styles.submitButton}>
                Add Book
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBookForm;
