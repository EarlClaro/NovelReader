import AddBookForm from "@/components/AddBookForm";
import BooksList from "@/components/BooksList";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <Layout>
      <div>
        <AddBookForm />
        <BooksList />
      </div>
    </Layout>
  );
};

export default HomePage;
