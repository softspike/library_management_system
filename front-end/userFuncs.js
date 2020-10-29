    // OBJECT FIELD TO DATA TO SERVER AND FROM SERVER
    let userToServer = {
        name:"",
        barcode:"",
        memberType:""
    }

    // OBJECT FIELD TO DATA TO SERVER AND FROM SERVER
    let userFromServer = [
        {
            id: 1,// delete a user
            name:"",
            barcode:"",
            memberType:""
        }
    ]

    // ONCHANGE HANDLER
    const handleNameChange = (event) => {
        userToServer.name = event.target.value;
    }

    const handleBarcodeChange = (event) => {
        userToServer.barcode = event.target.value;
    }

    const handleMemberTypeChange = (event) => {
        userToServer.memberType = event.target.value;
    }

    const handleSearch =(event) => {
        console.log('test')
        event.preventDefault();
        getRequest()
}

    //GETTING DATA FROM THE OBJECT FIELD AND MAP SEARCH RESULTS TO ALL THE TAKEN DATA TO SEARCH TABLE
    const updateTable = () => {

        const tableBody = document.getElementById("your-table-body-id");
        // RESET ALL THE DATA OF THE SEARCH TABLE
        tableBody.innerHTML = "";

        // BUILD A SEARCH TABLE
        userFromServer.forEach( user => {
            let newRow = document.createElement("tr");
            tableBody.appendChild(newRow);

            if (user.barcode.length > 0) {
                let newId = document.createElement("td");
                let newName = document.createElement("td");
                let newBarcode = document.createElement("td");
                let newMemberType =  document.createElement("td");
                newId.textContent = user.id;
                newName.textContent = user.name;
                newBarcode.textContent = user.barcode;
                newMemberType.textContent = user.memberType;// delete a usertent = user.memberType;
                newRow.appendChild(newId);
                newRow.appendChild(newName);
                newRow.appendChild(newBarcode);
                newRow.appendChild(newMemberType);

            } else {
                let newId = document.createElement("td");
                newId.textContent = "No user found";
                newRow.appendChild(newId);
            }
        });
    }

///////////////////////////////////////ADD USER TO THE SERVER////////////////////////////////////////////////////
const addUser = () => {

  const AddInput = document.getElementsByClassName("addBookInput");

  AddInput[0].addEventListener("change", handleNameChange);
  AddInput[1].addEventListener("change", handleBarcodeChange);
  AddInput[2].addEventListener("change", handleMemberTypeChange);
  AddInput[3].addEventListener("change", handleMemberTypeChange);

  const addUserToServer = (req, res) => {
      fetch('http://127.0.0.1:3000/users', {
// USED METHOD POST TO RETRIEVE DATA FROM THE SERVER
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              name: userToServer.name,
              barcode: userToServer.barcode,
              memberType:userToServer.memberType
          })
      })
      .catch(console.log)
      event.preventDefault();
      console.log(userToServer)
  }

  const addUserSubmit = document.getElementById('addBookSubmit');
  addUserSubmit.addEventListener("click",addUserToServer );
}


/////////////////////////////////////////////SEARCH USER (TO GET DATA AS AN OBJECT)//////////////////////////////////////
const searchUser = () => {

    const SearchNameInput = document.getElementById("SearchTitle");
    const SearchMemberTypeInput = document.getElementById("SearchAuthors");

    SearchNameInput.addEventListener("change", handleNameChange);
    SearchMemberTypeInput.addEventListener("change", handleMemberTypeChange);


  const a = () => {event.preventDefault()}


  const getRequest = () => {
    userFromServer = [];
    fetch('http://127.0.0.1:3000/users', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(user => user.map(mappedItem => {
      userFromServer.push(mappedItem)
    }))

    .then(data => updateTable())

    .catch(error => console.log(error))
  }
    const searchUserSubmit = document.getElementById('searchBookSubmit');
    searchUserSubmit.addEventListener("click", getRequest);

}

// //////////////////////////////////////////////DELETE USER DATA FROM THE SERVER////////////////////////////////////////
const deleteUser = () => {
    const deleteInput = document.getElementsByClassName("deleteBookInput");

    let userID = "";
    const handleIdChange = (event) => {
        userID = event.target.value;
    }

    deleteInput[0].addEventListener("change", handleIdChange);

    const deleteuser = () => {
       event.preventDefault();
        fetch(`http://127.0.0.1:3000/users/${userID}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .catch(console.log)
    }

    const deleteUserSubmit = document.getElementById("SubmitDeleteBook");
    deleteUserSubmit.addEventListener("click", deleteuser);
}

///////////////////////////////////////////////////////UPDATE A USER///////////////////////////////////////////////
const updateUser = () => {

  const UpdateInput = document.getElementsByClassName("UpdateInput");
// 4 event lsiteners added to display foru inputs on the selected table
  UpdateInput[0].addEventListener("change", handleNameChange);
  UpdateInput[1].addEventListener("change", handleBarcodeChange);
  UpdateInput[2].addEventListener("change", handleMemberTypeChange);
  UpdateInput[3].addEventListener("change", handleMemberTypeChange);

  const UserIdInput = document.getElementById("UpdateID");

  let userID = "";
  const handleIdChange = (event) => {
      userID = event.target.value;
  }
  UserIdInput.addEventListener("change", handleIdChange);

  const UpdateUser = (req, res) => {
      fetch(`http://127.0.0.1:3000/users/${userID}`, {
// USED METHOD PUT TO RETRIEVE DATA FROM THE SERVER
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              name: userToServer.name,
              barcode: userToServer.barcode,
              memberType:userToServer.memberType
          })
      })
      .catch(console.log)
      event.preventDefault();
  }

  const addUserSubmit = document.getElementById('UpdateSubmit');
  addUserSubmit.addEventListener("click",UpdateUser );
}


addUser();
searchUser();
deleteUser();
updateUser();
//USERS TABLE FUNCTIONALITY END
