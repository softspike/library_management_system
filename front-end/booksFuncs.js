const base_url = "http://127.0.0.1:3000";

//SLIDING TEXT IN A HEADER
var hotbod = document.querySelector("body");

function doStuff() {
    hotbod.className += " animate";
}

window.onload = function() {
    doStuff();
};
/////////////////

//THE DATA OBJECTS TO SERVER AND FROM SERVER GET-POST-DELETE-PUT
let book = {
    title:"",
    isbn:"",
    autor:""
}


let bookToServer = {
    title:"",
    isbn:"",
    authors:""
}


let bookFromServer = [
    {
        id: 1,
        title:"",
        isbn:"",
        authors:""
    }
]

//HANDLERS CHANGE for search and add functions
    const handleTitleChange = (event) => {
        bookToServer.title = event.target.value;
    }

    const handleIsbnChange = (event) => {
        bookToServer.isbn = event.target.value;
    }

    const handleAuthorsChange = (event) => {
        bookToServer.authors = event.target.value;
    }

    const handleSearch =(event) => {
        console.log('test')
        event.preventDefault();
        getRequest()
}

//GETTING DATA FROM THE OBJECT FIELD AND MAP SEARCH RESULTS TO ALL THE TAKEN DATA TO SEARCH TABLE
    const updateTable = () => {

      console.log(bookFromServer)
        const tableBody = document.getElementById("your-table-body-id");

              // RESET THE ALL DATA OF THE SEARCH TABLE
        tableBody.innerHTML = "";

          // BUILD A SEARCH TABLE
        bookFromServer.forEach( book => {
            let newRow = document.createElement("tr");
            tableBody.appendChild(newRow);

            if (book.title.length > 0) {
                let newId = document.createElement("td");
                let newTitle = document.createElement("td");
                let newISBN = document.createElement("td");
                let newAuthors =  document.createElement("td");
                newId.textContent = book.id;
                newTitle.textContent = book.title;
                newISBN.textContent = book.isbn;
                newAuthors.textContent = book.authors;
                newRow.appendChild(newId);
                newRow.appendChild(newTitle);
                newRow.appendChild(newISBN);
                newRow.appendChild(newAuthors);

                let newEditTd = document.createElement("td");
                let newEditInput = document.createElement("button");
                newEditTd.appendChild(newEditInput);
                newEditInput.textContent = "Edit";
                newRow.appendChild(newEditTd);

                let newNoteTd = document.createElement("td");
                newNoteTd.textContent = "click to edit";
                newNoteTd.contentEditable = 'true'
                newRow.appendChild(newNoteTd);

            } else {
                let newId = document.createElement("td");
                newId.textContent = "No book found";
                newRow.appendChild(newId);
            }
        });
    }

//////////////////////////////////////////////// ADD USER TO SERVER//////////////////////////////////////////////////
const addbook = () => {

  const AddInput = document.getElementsByClassName("addBookInput");
// USED METHOD POST TO RETRIEVE DATA FROM THE SERVER
  AddInput[0].addEventListener("change", handleTitleChange);
  AddInput[1].addEventListener("change", handleIsbnChange);
  AddInput[2].addEventListener("change", handleAuthorsChange);

  const addBookToServer = (req, res) => {
      fetch('http://127.0.0.1:3000/books', {

          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              title: bookToServer.title,
              isbn: bookToServer.isbn
          })
      })
      .then(res => res.json())
      .then (book => {
          fetch(`http://127.0.0.1:3000/books/${book.body.id}/authors`, {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  name: bookToServer.authors
              })
          })
      })
      .catch(console.log)
      event.preventDefault();
  }

  const addBookSubmit = document.getElementById('addBookSubmit');
  addBookSubmit.addEventListener("click",addBookToServer );
}
//SEARCH USER (TO GET DATA AS AN OBJECT)
const searchBook = () => {

    const SearchTitleInput = document.getElementById("SearchTitle");
    const SearchAuthorsInput = document.getElementById("SearchAuthors");

    SearchTitleInput.addEventListener("change", handleTitleChange);
    SearchAuthorsInput.addEventListener("change", handleAuthorsChange);


  const a = () => {console.log("!!!!!!!!!!!"); event.preventDefault()}


  const getRequest = () => {
    bookFromServer = [];
    fetch('http://127.0.0.1:3000/books', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(book => book.map(mappedItem => {
      bookFromServer.push(mappedItem)
    }))
    .then(data => updateTable())
    .catch(error => console.log(err))
  }
    const searchBookSubmit = document.getElementById('searchBookSubmit');
    searchBookSubmit.addEventListener("click", getRequest);

}


//////////////////////////////////////////////// DELETE BOOK DATA FROM SERVER/////////////////////////////////////////////
const deleteBook = () => {
    const deleteInput = document.getElementsByClassName("deleteBookInput");

    let bookID = "";
    const handleIdChange = (event) => {
        bookID = event.target.value;
    }

    deleteInput[0].addEventListener("change", handleIdChange);

    const deletebook = () => {
       event.preventDefault();
        fetch(`http://127.0.0.1:3000/books/${bookID}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .catch(console.log)
    }

    const deleteBookSubmit = document.getElementById("SubmitDeleteBook");
    deleteBookSubmit.addEventListener("click", deletebook);
}

addbook();
searchBook();
deleteBook();
