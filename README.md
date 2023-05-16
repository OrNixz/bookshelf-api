
# Project Title

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
7. Open Postman application and click on the "Import" button and select the "Bookshelf API Test Collection" and "Environment" files that were provided with the project.
8. Change the Environment Variables to `Bookshelf API Test`.
9. Finally, you can `Run Bookshelf API test` to run the entire tests. However, if you reach at the limit, you can try run one by one sequentially.
## Code Structures

`handler.js`: This file provides the logic for dealing with requests and responses. It serves as a bridge between the routes and the data.

`books.js`: Represents the book collection's data structure. This file contains an array or interacts with a database to store and retrieve book information.

`server.js`: Starts the server and configures it as needed. Initializes an HTTP server with a framework such as Hapi.

`routers.js`: Specifies the app's routes. This file translates HTTP methods and endpoints (GET, POST, PUT, DELETE, etc.) to the proper handler functions in `handler.js`.
