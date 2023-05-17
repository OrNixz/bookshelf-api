
# Bookshelf API

Bookshelf API is a final submission on "Belajar Membuat Aplikasi Back-End untuk Pemula" from Dicoding course. This project built 
by npm package manager, Hapi Framework, and Nodemon. And for testing purposes, we using Postman.

This submission can perform various operations such as adding books, retrieving book details, updating book information, and deleting books. The submission includes two important files for testing: the "Bookshelf API Test Collection" and the "Environment" file.


## Getting Started

1. Clone this repository.
2. Extract the files to your local destination.
3. Make sure you have already installed `Node.js` and `npm (Node Package Manager)`. If you don't have one, you can download it on `https://nodejs.org/en`.
4. Open the file and navigate to the project directory folders.
5. Install the dependencies required by the Bookshelf API .project using this command `npm install`.
6. You can start the API server using this command `npm run start`.
7. By default, this program will run on localhost:9000.
8. Open Postman application and click on the "Import" button and select the "Bookshelf API Test Collection" and "Environment" files that were provided with the project.
9. Change the Environment Variables to `Bookshelf API Test`.
10. Finally, you can `Run Bookshelf API test` to run the entire tests. However, if you reach at the limit, you can try run one by one sequentially.

## Code Structures

`handler.js`: This file provides the logic for dealing with requests and responses. It serves as a bridge between the routes and the data.

`books.js`: Represents the book collection's data structure. This file contains an array or interacts with a database to store and retrieve book information.

`server.js`: Starts the server and configures it as needed. Initializes an HTTP server with a framework such as Hapi.

`routers.js`: Specifies the app's routes. This file translates HTTP methods and endpoints (GET, POST, PUT, DELETE, etc.) to the proper handler functions in `handler.js`.


## Endpoint

### 1. API Can Store Books

- **Request**
    - Method: `POST`
    - URL: `/books`
    - Body Request:
        ```
        {
            "name": "string",
            "year": "number",
            "author": "string",
            "summary": "string",
            "publisher": "string",
            "pageCount": "number",
            "readPage": "number",
            "reading": "boolean"
        }
        ```
- **Response**
    - If the client does not provide the `name` property in the request body, the server will respond with:
        - **Status Code: 400**
        - Response body:
        ```
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
        ```
    - If the client provides a `readPage` value greater than the `pageCount` value, the server will respond with:
        - **Status Code: 400**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
    - If the book is successfully added, the server will respond with:
        - **Status Code: 201**
        - Response Body:
        ```
        {
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": "1L7ZtDUFeGs7VlEt"
            }
        }
        ```

### 2. API Can Retrieve All Books
- **Request**
    - Method: `GET`
    - URL: `/books`
- **Response**
    - If there are books available, the server will respond with:
        - **Status Code: 200**
        - Response Body:
        ```
        {
            "status": "success",
            "data": {
                "books": [
                    {
                        "id": "Qbax5Oy7L8WKf74l",
                        "name": "Buku A",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "1L7ZtDUFeGs7VlEt",
                        "name": "Buku B",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "K8DZbfI-t3LrY7lD",
                        "name": "Buku C",
                        "publisher": "Dicoding Indonesia"
                    }
                ]
            }
        }
        ```
    - If no books are available, the server will respond with an empty array:
        - **Status Code: 200**
        - Response Body:
        ```
        {
            "status": "success",
            "data": {
                "books": []
            }
        }
        ```

### 3. API Can Retrieve Book Details
- **Request**
    - Method: `GET`
    - URL: `/books/{bookId}`
- **Response**
    - If the book with the specified `Id` is found, the server will respond with:
        - **Status Code: 200**
        - Response Body:
        ```
        {
            "status": "success",
            "data": {
                "book": {
                "id": "aWZBUW3JN_VBE-9I",
                "name": "Buku A Revisi",
                "year": 2011,
                "author": "Jane Doe",
                "summary": "Lorem Dolor sit Amet",
                "publisher": "Dicoding",
                "pageCount": 200,
                "readPage": 26,
                "finished": false,
                "reading": false,
                "insertedAt": "2021-03-05T06:14:28.930Z",
                "updatedAt": "2021-03-05T06:14:30.718Z"
                }
            }
        }
        ```
    - If the book with the specified `Id` is not found, the server will respond with:
        - **Status Code: 404**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }

        ```

### 4. API Can Update Book data
- **Request**
    - Method: `PUT`
    - URL: `/books/{bookId}`
    - Body Request:
    ```
    {
        "name": "string",
        "year": "number",
        "author": "string",
        "summary": "string",
        "publisher": "string",
        "pageCount": "number",
        "readPage": "number",
        "reading": "boolean"
    }
    ```
- **Response**
    - If the client does not provide the `name` property in the request body, the server will respond with:
        - **Status Code: 400**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
        ```
    - If the client provides a `readPage` value greater than the `pageCount` value, the server will respond with:
        - **Status Code: 400**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
    - If the specified `Id` is not found, the server will respond with:
        - **Status Code: 404**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
        ```
    - If the book is successfully updated, the server will respond with:
        - **Status Code: 200**
        - Response Body:
        ```
        {
            "status": "success",
            "message": "Buku berhasil diperbarui"
        }
        ```

### 5. API Can Delete a Book
- **Request**
    - Method: `DELETE`
    - URL: `/books/{bookId}`
- **Response**
    - If the specified `id` is not found, the server will respond with:
        - **Status Code: 404**
        - Response Body:
        ```
        {
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        }
        ```
    - If the book is successfully deleted, the server will respond with:
        - **Status Code: 200**
        - Response Body:
        ```
        {   
            "status": "success", 
            "message": "Buku berhasil dihapus" 
        }
        ```
