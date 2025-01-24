// src/components/UploadBook.tsx
import React, { useState } from 'react';

const UploadBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && file) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      // Send form data to your backend (NestJS or other)
      // Example: await fetch('/upload', { method: 'POST', body: formData });

      console.log('Book uploaded:', title);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="file">Upload Book File (PDF, EPUB)</label>
        <input
          id="file"
          type="file"
          accept=".pdf, .epub"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Upload Book</button>
    </form>
  );
};

export default UploadBook;
