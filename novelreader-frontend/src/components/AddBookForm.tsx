// src/components/AddBookForm.tsx

"use client"; 

import { useState } from "react";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("summary", summary);
    if (file) {
      formData.append("file", file);
    }

    // Send POST request to backend to add the book
    await fetch("http://localhost:3001/books/add", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="author" className="block">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="file" className="block">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
