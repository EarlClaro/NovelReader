import AddBookForm from "@/components/AddBookForm";
import BooksList from "@/components/BooksList";
import Layout from "@/components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <AddBookForm />
        <BooksList />
      </div>
    </Layout>
  );
};

export default HomePage;
