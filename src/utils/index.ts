import { Book, ShelfType } from "../models";
import { update } from "../services/BooksAPI";

export const handleUpdateShelfTypeBook = async (
  idBook: string,
  shelf: ShelfType,
) => {
  try {
    await update(idBook, shelf);
  } catch (error) {
    console.log("error", error);
  }
};

export const handleFilterListBooks = (
  books: Book[],
  shelf: ShelfType,
): Book[] => {
  const result = books.filter((item) => item.shelf === shelf);
  return result;
};
