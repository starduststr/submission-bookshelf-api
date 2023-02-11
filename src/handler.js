// https://www.dicoding.com/academies/261/tutorials/14967/submission-guidance

const { nanoid } = require("nanoid");
const books = require("./books");

// Menyimpan buku

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    reading,
    readPage,
  } = request.payload;

  // Cek properti name
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);

    return response;
  }

  // Cek nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);

    return response;
  }

  const id = nanoid(16);

  let finished = false;
  if (pageCount == readPage) {
    finished = true;
  }

  const insertedAt = new Date().toISOString();

  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    publisher,
    summary,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    });

    response.code(201);

    return response;
  }

  // Server gagal memasukkan buku karena alasan umum (generic error).
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });

  response.code(500);

  return response;
};

// Menampilkan seluruh buku

const getAllBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;

  if (reading !== undefined) {
    if (reading === "1") {
      const dataBook = [];

      books.forEach((book) => {
        if (book.reading) {
          dataBook.push(book);
        }
      });

      const response = h.response({
        status: "success",
        data: { books: dataBook },
      });

      response.code(200);

      return response;
    } else {
      const dataBook = [];

      books.forEach((book) => {
        if (!book.reading) {
          dataBook.push(book);
        }
      });

      const response = h.response({
        status: "success",
        data: { books: dataBook },
      });

      response.code(200);

      return response;
    }
  }

  if (finished !== undefined) {
    if (finished === "1") {
      const dataBook = [];

      books.forEach((book) => {
        if (book.finished) {
          dataBook.push(book);
        }
      });

      const response = h.response({
        status: "success",
        data: { books: dataBook },
      });

      response.code(200);

      return response;
    } else {
      const dataBook = [];

      books.forEach((book) => {
        if (!book.finished) {
          dataBook.push(book);
        }
      });

      const response = h.response({
        status: "success",
        data: { books: dataBook },
      });

      response.code(200);

      return response;
    }
  }

  if (name !== undefined) {
    const dataBook = [];

    const searchByName = String(name).toLowerCase();

    books.forEach((book) => {
      const bookName = String(book.name).toLowerCase();

      if (bookName.includes(searchByName)) {
        dataBook.push(book);
      }
    });

    const response = h.response({
      status: "success",
      data: { books: dataBook },
    });

    response.code(200);

    return response;
  }

  const dataBook = books.map((book) => {
    const { id, publisher } = book;

    return { id, name: book.name, publisher };
  });

  const response = h.response({
    status: "success",
    data: { books: dataBook },
  });

  response.code(200);

  return response;
};

// Menampilkan detail buku

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: { book },
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);

  return response;
};

// Mengubah data buku

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Cek properti name
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);

    return response;
  }

  // melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);

    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);

    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);

  return response;
};

// Mengapus data buku

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });

    response.code(200);

    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);

  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
