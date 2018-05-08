
// use the mysql and inquirer NPM packages and assign them to variables
const mysql = require('mysql');
const inquirer = require('inquirer');

// response variables for use in functions
let response1;
let response2;

// variables used to store input values from the user through inquirer
let idNum2;
let numUnits2;

// define a connection to my mysql database and assign the required parameters to a const variable
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// instantiate a connection to my mysql database
connection.connect(function(error) {
    if(error) throw error;
    console.log("You have successfully connected to the bamazon MySQL database");
});

// prompt is a function that asks the user 2 questions leveraging the inquirer package
let prompt = function() {
    inquirer.prompt([
        {
            name: "IDtobuy",
            message: "What is the ID number of the product that you'd like to buy?"
        },
        {
            name: "unitsOfProduct",
            message: "How many units of this product would you like to buy?"
        }
    ]).then(function(answers) {       
        let idNum = answers.IDtobuy - 1;
        let numUnits = answers.unitsOfProduct;

        if(numUnits > response1[idNum].stock_quantity) {
            console.log("Insufficient quantity!");
        } else {
            console.log("The total cost of your purchase is: $", (response1[idNum].price * numUnits));
            let updateDatabase = function(error, responses) {
                if(error) {
                    throw error;
                }

                connection.query("UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: response1[idNum].stock_quantity - numUnits,
                    },
                    {
                        item_id: idNum + 1
                    }
                ], 
                )};
            
            updateDatabase();
        };
            connection.end();
        });
    };

// this function updates the stock quanitity in the mysql database after a purchase is made
let updateDatabase = function(error) {
    if(error) {
        throw error;
    }
    console.log("updating product");
    connection.query("UPDATE products SET ? WHERE ?", 
    [
        {
            stock_quantity: response2[idNum2].stock_quantity - numUnits2,
        },
        {
            item_id: idNum2
        }
    ], 
)};


// this customer function displays all of the items and their associated quantities from the mysql database in the console
let customer = function() {
    connection.query("SELECT * FROM products", [0], function (error, response) {
        for (let i = 0; i < response.length; i++) {
            console.log("Item ID: " + response[i].item_id + " | Product Name: " + response[i].product_name + " | Price: " + response[i].price);
        }
        response1 = response;
        prompt();
    });    
};

// this calls the customer function
customer();