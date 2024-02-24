import { Book, ResponseUpdate, ShelfType } from "../models";

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substring(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId: string): Promise<Book> =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = (): Promise<Book[]> =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (id: string, shelf: ShelfType): Promise<ResponseUpdate> =>
  fetch(`${api}/books/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (
  query: string,
  maxResults: number,
): Promise<
  | Book[]
  | {
      error: "empty query";
      items: [];
    }
> =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
