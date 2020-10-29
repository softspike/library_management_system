# library_management_system

<p align="center">
  <img src="https://user-images.githubusercontent.com/47834415/97384109-f18be300-18c6-11eb-9555-5eafb6b00551.png" alt="ponty-home" width="450px" height="200px" />
</p>

# Table of contents
* [General info](#general-info)
* [Learning outcome](#learning-outcome)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#Features)

# General info

This is a simple server application that allows the “University” to track the books that they have, the library users, and which users have borrowed which books.

The application also comes with an .sqlite database in which the data for the application is stored, and an ORM mapping between the database objects and JavaScript objects.

The applications itself provides a simple server with a REST API which has the following functionality:

•	API endpoints:

	/users
	/books
	/loans

Each API endpoint accepts HTTP requests with the verbs GET, POST, PUT and DELETE.

This system will be used by the librarians to manage their library and associated data. The created front-end allows them to:
### Users Section

	U1 - Add a new User to the Library system with the fields Name, Barcode and Member Type (Staff/Student)
	U2 - Get a User’s details from the Library system by searching on Name or Barcode
	U3 - Update a User’s Name or Member Type
	U4 - Remove a User
	
### Loans Section

	B1 - Add a new Book to the Library system with the fields Title, ISBN, Authors
	B2 - Get a Book’s details by searching on Title or Author
	B3 - Remove a Book
	
### Books Section

	L1 - Loan a Book to a User (if it is not already out on Loan), specifying the Due Date
	L2 - Get the User currently borrowing a Book
	L3 - Get a list of a User’s current Loans

API endpoints are implemented in the Server application to allow this functionality, documentation comments on each endpoint and the parameters accepted are included in the server application source code.

# Learning outcome

1. Recognise the process by which webpages are delivered to users, from first browser request, through DNS lookup, server-side processing to final HTML response.
2. Create static HTML pages and apply CSS rules to style and position elements.
3. Describe, create and manipulate HTML page and element structure (the Document Object Model)
4. Use JavaScript and popular JavaScript libraries to add interactivity to static HTML webpages.
5. Access web APIs and data sources, retrieve, manipulate and display data.
6. Use browser debugging tools to understand performance and execution of code in the browser.
7. Assess the role of web frameworks in web application development.

# Technologies

Project is created with:
</br>
* JavaScript
* HTML 5
* CSS 3
* SQL
* Node.JS

## Setup

### Back-End Installation❗

Use terminal to open the `back-end` folder :

Download and install all requirements for the server with:

```
npm install
```

### Initialising a Database❗

Before you run the server for the first time, you should ensure there is a database available for it to read and write to. You can initialise the database with:

```
node initialise_database.js
```

This will create a `library.sqlite` file inside the `data/` directory and pre-populate it with some sample data.

**CAUTION!** Running this command will remove any data already stored in the database `data/library.sqlite`. It should be used with caution, only when you want to reset the Database to its initial state.

### Running the Server❗

Start the server with:

```
node server.js
```

This will start the server running on `127.0.0.1` port `3000`.

### Check everything is working correctly❗

To check the database and server are operating correctly you can open `http://127.0.0.1:3000/authors` in a Web Browser. This should return a JSON representation of all the Authors stored in the database.


### Running the Front-End Application❗ 

``Use terminal to open the `front-end` folder:``

Run the application in the development mode in `front-end` i.e.:

`python -m SimpleHTTPServer`

check if the app is running on `http://0.0.0.0:8000/`

# Features

Desktop view (click to enlarge the screenshots):

<img src="https://user-images.githubusercontent.com/47834415/97452603-d18f0a80-192c-11eb-93a8-f89727add47f.png" alt="home-page" width="325px" />
<img src="https://user-images.githubusercontent.com/47834415/97439873-a56c8d00-191e-11eb-8256-d47a43021be2.png" alt="user-page" width="325px" />
<img src="https://user-images.githubusercontent.com/47834415/97452118-53326880-192c-11eb-98ae-7c9eba78366f.png" alt="loans-page" width="325px" />
<img src="https://user-images.githubusercontent.com/47834415/97452298-7eb55300-192c-11eb-88a3-cc982ceaf8be.png" alt="books-page" width="325px" />

Mobile view:

<img src="https://user-images.githubusercontent.com/47834415/97439296-e3b57c80-191d-11eb-87b2-cd612a4a2ce3.png" alt="mobile-home" width="195px" />

### Users Section

<img src="https://user-images.githubusercontent.com/47834415/97506895-efcc2900-1973-11eb-84e6-8bca9df2a6b8.png" alt="cloud-icon" width="550px" />

All User records are retrieved from the server once the page is loaded.

<strong>*** Search User by Name or Barcode: </strong> The search bar is a text input that will dynamically and instantly, without refreshing the webpage filter the user records table, based on the charachters contained inside user’s barcode or name.

<strong>*** Add User: </strong> click `ADD NEW USER`

<img src="https://user-images.githubusercontent.com/47834415/97507553-50a83100-1975-11eb-8ddf-b52065d0d77f.png" alt="new-user" width="550px" />

Populate the prompted information in the form. Click `Submit` button, which will send a POST request to the server and update the database. Note: Barcode needs to contain 6 digits, otherwise the request will not be sent and prompt message will appear to provide 6 digits.

<strong>*** Remove User: </strong> Click the `DELETE` button in the Users Table, next to the chosen record under Delete User column. Confirmation pop-up message will appear, choose `CANCEL` or `OK`.

<strong>*** Edit User: </strong> Enter the existing User's details. Once the details are changed, click `Submit` button to finalise the update. The updated information appears in the database.

<img src="https://user-images.githubusercontent.com/47834415/97508115-bb0da100-1976-11eb-9072-afea427a6d70.png" alt="cloud-icon" width="550px" />


### Books Section

<img src="https://user-images.githubusercontent.com/47834415/97508916-b4802900-1978-11eb-8257-bb397e7e5f4d.png" alt="cloud-icon" width="575px" />

All Book records are retrieved from the server once the page is loaded.

<strong>*** Search Book by Title or Author: </strong> The search bar is a text input that will dynamically and instantlly, without refreshing the webpage filter the book records table, based on the charachters contained inside book’s title or author.

<strong>*** Add Book: </strong> Click `ADD NEW BOOK` populate the prompted information in the form, to submit new book's details to the database.

<img src="https://user-images.githubusercontent.com/47834415/97509367-ffe70700-1979-11eb-93fb-b9e2e6bda223.png" alt="cloud-icon" width="550px" />

<strong>*** Delete Book: </strong> Click the `DELETE` button in the Books Table, next to the chosen record under `Delete Book` column. Confirmation pop-up message will appear, choose `CANCEL` or `OK`.

<strong>*** Edit Book: </strong> Click the `EDIT` button in the Books Table, new page will open, change the information accordingly and click `Submit`.

### Loans Section

<strong>*** Search Loans by User's ID: </strong> input user's ID in the prompted field, click `SEARCH` button. All the books, borrowed using the specified ID are displayed.

<img src="https://user-images.githubusercontent.com/47834415/97510177-1b531180-197c-11eb-970c-083e7ac6852b.png" alt="cloud-icon" width="550px" />

If there are any loans on provided user's ID, then the main table will be updated and `RESET SEARCH` button will appear, to return to previous state. Otherwise, "No loans found!" message will appear and `RESET SEARCH` button will appear.

<strong>*** Add New Loan: </strong> Click `ADD NEW LOAN` input fields, populate the form with prompted information.

<img src="https://user-images.githubusercontent.com/47834415/97510901-a8e33100-197d-11eb-88f8-ed22797b2843.png" width="575px" />

When finished, click `SUBMIT`.

<strong>*** Find User Borrowing the Book: </strong> Input book's ID in the prompted field. Click `SEARCH` If the book does not exist or has not been loaned out, "No loans found!" message will appear and `RESET SEARCH` button will appear. Otherwise, Loans table will update loans, showing the User ID holding the Book.

