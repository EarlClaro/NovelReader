
import BooksList from "../components/BooksList";
import AddBookForm from "../components/AddBookForm";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <BooksList />
      <AddBookForm />
    </div>
  );
}
