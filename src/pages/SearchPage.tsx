import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../models";
import { search } from "../services/BooksAPI";
import BookComponent from "../components/Book";
import { handleUpdateShelfTypeBook } from "../utils";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [listSeachedBooks, setListSearchedBooks] = useState<Book[]>([]);

  const fetchSearchListBooks = async (query: string) => {
    try {
      const response = await search(query, 100);
      if ("error" in response) {
        console.error("API returned an error:", response.items);
      } else {
        console.log("success", response);
        setListSearchedBooks(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeFieldSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchSearchListBooks(query);
  }, [query]);

  console.log(listSeachedBooks);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => {
            navigate("/");
          }}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={handleChangeFieldSearch}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {listSeachedBooks.map(({ authors, id, title, imageLinks }) => (
            <li key={id}>
              <BookComponent
                handleChangeShelfType={handleUpdateShelfTypeBook}
                id={id}
                authors={authors}
                thumbnail={imageLinks?.thumbnail}
                title={title}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
