const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  // Menyimpan buku
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },

  // <enampilkan seluruh buku
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },

  // Menampilkan detail buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },

  // Mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },

  // Menghapus buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
