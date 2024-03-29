import { ShelfType } from "../models";

type BookProps = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  handleChangeShelfType: (idBook: string, value: ShelfType) => void;
};

const BookComponent = ({
  authors,
  thumbnail,
  title,
  id,
  handleChangeShelfType,
}: BookProps) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(e) =>
              handleChangeShelfType(id, e.target.value as ShelfType)
            }
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors?.join(", ")}</div>
    </div>
  );
};

export default BookComponent;
