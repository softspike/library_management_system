const path = require("path");
const Sequelize = require("sequelize");

const dataDir = path.join(__dirname, "data");

// initialise a database connection
const sequelize = new Sequelize("libraryDB", null, null, {
    dialect: "sqlite",
    storage: path.join(dataDir, "library.sqlite")
});

// connect to the database
sequelize.authenticate().then(
    function() {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

//  MODELS

// Author has a Name
const Author = sequelize.define("Author", {
    name: Sequelize.STRING
});

// Book has a Title and an ISBN number
const Book = sequelize.define("Book", {
    title: Sequelize.STRING,
    isbn: Sequelize.STRING
});

// Book has one or more Authors
Book.belongsToMany(Author, { through: "author_books" });
// Author has written one or more Books
Author.belongsToMany(Book, { through: "author_books" });

// User has a Name, a Barcode and a MemberType (which can be Staff or Student)
const User = sequelize.define("User", {
    name: Sequelize.STRING,
    barcode: Sequelize.STRING,
    memberType: Sequelize.ENUM("Staff", "Student")
});

// Loan has a DueDate
const Loan = sequelize.define("Loan", {
    dueDate: Sequelize.DATE
});

// A User can have many Loans
User.hasMany(Loan, { as: "Loans" });
// A Book can be on one Loan at a time
Book.hasOne(Loan);

//  SYNC SCHEMA
const initialiseDatabase = function(wipeAndClear, repopulate) {
    sequelize.sync({ force: wipeAndClear }).then(
        function() {
            console.log("Database Synchronised");
            if (repopulate) {
                repopulate();
            }
        },
        function(err) {
            console.log("An error occurred while creating the tables:", err);
        }
    );
};

module.exports = {
    initialiseDatabase,
    Author,
    Book,
    User,
    Loan
};
