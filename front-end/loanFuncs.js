// OBJECT FIELD TO DATA TO SERVER AND FROM SERVER
let = loanFromServer = [];
let userID = "";
let bookID = "";

const handleSearch =(event) => {
    event.preventDefault();
    getRequest()
}

//////////////////////////////SEARCH//////////////////////////////////////////////////////////////////////
//// GETTING DATA FROM THE OBJECT FIELD AND MAP SEARCH RESULTS TO ALL THE TAKEN DATA TO SEARCH TABLE
const updateTable = () => {

  const tableBody = document.getElementById("your-table-body-id");
  // RESET THE ALL DATA OF THE SEARCH TABLE
    tableBody.innerHTML = "";

    // BUILD A SEARCH TABLE
    loanFromServer.forEach( loan => {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        if (loan.dueDate.length > 0) {
            let newId = document.createElement("td");
            let newDueDate = document.createElement("td");
            let newBookId = document.createElement("td");
            let newUserId = document.createElement("td");
            let newcreatedAt = document.createElement("td");
            let newupdatedAt = document.createElement("td");
            newId.textContent = loan.id;
            newDueDate.textContent = loan.dueDate;
            newBookId.textContent = loan.BookId;
            newUserId.textContent = loan.UserId;
            newcreatedAt.textContent = loan.createdAt;
            newupdatedAt.textContent = loan.updatedAt;
            newRow.appendChild(newId);
            newRow.appendChild(newDueDate);
            newRow.appendChild(newBookId);
            newRow.appendChild(newUserId);
            newRow.appendChild(newcreatedAt);
            newRow.appendChild(newupdatedAt);

        } else {
            let newId = document.createElement("td");
            newId.textContent = "No loan found";
            newRow.appendChild(newId);
        }
    });
  }

//SEARH FOR USER'S LOAN
const searchUsersLoan = () => {
  const UserIdInput = document.getElementById("SearchTitle");

  const handleIdChange = (event) => {
      userID = event.target.value;
  }

  UserIdInput.addEventListener("change", handleIdChange);

  const SearchUsersLoan = (req, res) => {
      loanFromServer = [];
      event.preventDefault();
      fetch(`http://127.0.0.1:3000/users/${userID}/loans`, {
// USED METHOD GET TO RETRIEVE DATA FROM THE SERVER
          method: 'get',
          headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(user => user.map(mappedItem => {
        loanFromServer.push(mappedItem)
      }))
      .then(data => updateTable())
      .catch(error => console.log(error))
  }

  const searchLoanSubmit = document.getElementById('searchBookSubmit');
  searchLoanSubmit.addEventListener("click", SearchUsersLoan );
}
////////////////////////////////////////End OF SEARCH FUNCTION///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////ADD LOAN////////////////////////////////////////////////////////////////////////////
const base = "http://127.0.0.1:3000";


//CREATE AND DISPLAY NEW LOANS INFORMATION:
const finalresponse = function(response) {
    let loan = JSON.parse(this.response);
    let store = document.getElementById("data-table-results");
    let userid = loan.UserId;
    let bookid = loan.BookId;
    let date = loan.dueDate;
    let text = document.createTextNode(`bookid - ${bookid}// Loan added for user: ${userid}, // due-date - ${date} `);
    let containtext = document.createElement("p");
    containtext.appendChild(text);
    store.appendChild(containtext)
}

//A LOAN IS CREATED ONLY IF THE BOOK IS NOT LOANED OUT YET, IF IT ISYET AN ERROR WILL BE SHOWN
const loanresponse = function(response) {
    let bookid = document.getElementById("addBookInput").value;
    let date = document.getElementById("addDueDate").value;
    let loans = JSON.parse(this.response);
    let bookLoanedOut = false
    loans.forEach(function(loan){
        if(bookid == loan.BookId){
          bookLoanedOut = true;
        };
    });
    if (bookLoanedOut == false) {
      loan = {
        "dueDate":date
      }
        postLoan(loan);
      }else {
      let result = document.getElementById("data-table-results");
      let text = document.createTextNode("Book is loaned out and not available" );
      let added = document.createElement("p");
      added.appendChild(text);
      result.appendChild(added)
    }
}

// TAKING ALL THE INPUTS FROM TABLE
let button = document.getElementById("addBookSubmit");
button.addEventListener("click", function() {
  let userid = document.getElementById("addUserInput").value;
  let bookid = document.getElementById("addBookInput").value;
  let date = document.getElementById("addDueDate").value;
  if (userid && bookid && date) {
    loanrequest();
  }
  else{
    //IF INPUTS ARE NOT RIGHT, THE SYSTEM WILL SHOW DETAILS ARE MISSING/ICORRECT
    let result = document.getElementById("data-table-results");
    let message = document.createTextNode("Missing/Incorrect details");
    let container = document.createElement("p");
    container.appendChild(message);
    result.appendChild(container)
  }

});

//GET REQUEST - GET ALL LOANS
const loanrequest = function () {
  var xhttp = new XMLHttpRequest();
  var requestUrl = base + "/loans";
  xhttp.addEventListener('load', loanresponse);
  xhttp.open('GET', requestUrl);
  xhttp.send();
}

//THE LOAN OBJECT IS STRINGIFIED AND SEND INTO BELOW WRITTEN END POINT
const postLoan = function (loan) {
  let userid = document.getElementById("addUserInput").value;
  let bookid = document.getElementById("addBookInput").value;
  var xhttp = new XMLHttpRequest();

  var requestUrl = base + "/users/" + userid + "/loans/" + bookid;
  xhttp.open('POST', requestUrl);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.addEventListener('load', finalresponse);
  xhttp.send(JSON.stringify(loan));
  console.log(loan);
}


//////////////////////////////////////////////END OF ALL LOAN FUNCTION//////////////////////////////////////////////////


/////////////////////////////////////////////SEARCH USER BORROWING A BOOK////////////////////////////////////////////////////////

//USER IDs REQUEST TO DEFINE A ELEMENT
let useridTd = ""
//ASSIGN THE USER ID NUMBER TO TABLE
const updateTable2 = (UserId) => {
    useridTd = document.createElement("td");
    useridTd.textContent = UserId;
    useridTd = document.getElementById("borowingRow").appendChild(useridTd);
}
//REMOVE THE PREVIOUS RESULTS OF USER ID
const removePreviousValue = () => {
  if(useridTd){
  useridTd.parentNode.removeChild(useridTd)
}else {return}
}


//SEARH A USER WHO IS BORROWING A BOOK
const searchBorroing = () => {
  const BookIdInput = document.getElementById("BookIdInput");

  const handleIdChange = (event) => {
      bookID = event.target.value;
  }

  BookIdInput.addEventListener("change", handleIdChange);

  const SearchBorroing = (req, res) => {
      removePreviousValue();
      fetch(`http://127.0.0.1:3000/loans`, {
// USED METHOD GET TO RETRIEVE DATA FROM THE SERVER
          method: 'get',
          headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(loans => loans.map(mappedItem => {
        if(bookID == mappedItem.BookId){
          return mappedItem
        }
      }))
      .then(mappedItem => mappedItem.filter(n => n))
      .then(mappedItem => mappedItem[0].UserId)
      .then(UserId => updateTable2(UserId))
      .catch(error => console.log(error))
  }

  const search = document.getElementById('SubmitSearchBorrowing');
  search.addEventListener("click", SearchBorroing );
}

searchUsersLoan();

searchBorroing();
