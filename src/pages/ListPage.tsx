import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookComponent from "../components/Book";
import { Book, ShelfType } from "../models";
import { getAll, update } from "../services/BooksAPI";
import { handleFilterListBooks } from "../utils";

const ListPage = () => {
  const navigate = useNavigate();
  const [listBooks, setListBooks] = useState<Book[]>([]);
  const [isReFetch, setIsReFetch] = useState<Number>(0);

  const fetchListBooks = async () => {
    try {
      const response = await getAll();
      setListBooks(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeShelfType = async (idBook: string, value: ShelfType) => {
    try {
      await update(idBook, value);
      setIsReFetch(Math.random());
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchListBooks();
  }, [isReFetch]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {handleFilterListBooks(listBooks, "currentlyReading").map(
                  ({ authors, id, title, imageLinks }) => (
                    <li key={id}>
                      <BookComponent
                        handleChangeShelfType={handleChangeShelfType}
                        id={id}
                        authors={authors}
                        thumbnail={imageLinks?.thumbnail}
                        title={title}
                      />
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {handleFilterListBooks(listBooks, "wantToRead").map(
                  ({ authors, id, title, imageLinks }) => (
                    <li key={id}>
                      <BookComponent
                        handleChangeShelfType={handleChangeShelfType}
                        id={id}
                        authors={authors}
                        thumbnail={imageLinks?.thumbnail}
                        title={title}
                      />
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {handleFilterListBooks(listBooks, "read").map(
                  ({ authors, id, title, imageLinks }) => (
                    <li key={id}>
                      <BookComponent
                        handleChangeShelfType={handleChangeShelfType}
                        id={id}
                        authors={authors}
                        thumbnail={imageLinks?.thumbnail}
                        title={title}
                      />
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a
          onClick={() => {
            navigate("/search");
          }}
        >
          Add a book
        </a>
      </div>
    </div>
  );
};

export default ListPage;
