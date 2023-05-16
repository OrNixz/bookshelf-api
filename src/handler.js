const { nanoid } = require('nanoid');
const books = require('./books');

// Adding new book
const addBook = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    /*
    Case 1 : If the client doesn't attach a name property to the request body, then
    */
    
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    /*
    Case 2 : If the client attach readPage property that is greater than pageCount property, then
    */

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    /*
    Case 3 : If the client complies each of the rules, then
    */

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
};

// Obtaining all books
const getAllBooks = (request, h) => {
    const {
        name,
        reading,
        finished
    } = request.query;

    let sortedBooks = books;

    if (name !== undefined) {
        sortedBooks = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    } else if (reading !== undefined) {
        sortedBooks = books.filter((b) => b.reading === !!Number(reading));
    } else if (finished !== undefined) {
        sortedBooks = books.filter((b) => b.finished === !!Number(finished));
    }
    
    if (sortedBooks.length === 0) {
      const response = h.response({
        status: 'success',
        data: {
          books: [],
        }
      });
      response.code(200);
      return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: sortedBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

// Obtaining a book based on an ID
const getBookById = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((book) => book.id === bookId)[0];

    /*
    Case 1 : If a book and its ID are discovered, then
    */

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    /*
    Case 2 : If a book and its ID are not discovered, then
    */

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}

// Updating the content of the book
const updateBookById = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();

    /*
    Case 1 : If the client doesn't attach a name property to the request body, then
    */

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    /*
    Case 2 : If the client attach readPage property that is greater than pageCount property, then
    */

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    /*
    Case 3 : If the client complies each of the rules, then
    */
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
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    /*
    Case 4 : If the client violates each of the rules, then
    */

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Deleting a book
const deleteBookById = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    /*
    Case 1 : If the ID attached by the client matches the book, then
    */

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    /*
    Case 2 : If the ID attached by the client doesn't correspond to any book, then
    */

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {
    addBook,
    getBookById,
    getAllBooks,
    updateBookById,
    deleteBookById,
};