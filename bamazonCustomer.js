const mysql = require('mysql');
const inquirer = require('inquirer');

let response1;
let response2;

let idNum2;
let numUnits2;


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(error) {
    if(error) throw error;
    console.log("You have successfully connected to the bamazon MySQL database");
    //connection.end();
});

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

        console.log(numUnits);
        console.log(response1[idNum].stock_quantity)

        if(numUnits > response1[idNum].stock_quantity) {
            console.log("Insufficient quantity!")
        } else {
            console.log("The total cost of your purchase is: $", (response1[idNum].price * numUnits));
            //connection.end();
            let updateDatabase = function(error, responses) {
                if(error) {
                    throw error;
                }
                console.log("updating product");
                connection.query("UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: response1[idNum].stock_quantity - numUnits,
                    },
                    {
                        item_id: idNum + 1
                    }
                ], 
                
                //function (error, response) {
                  // console.log("Item ID: " + response[i].item_id + " | Product Name: " + response[i].product_name + " | Price: " + response[i].price);
                //console.log(response);  
                )};
            //let customer2 = function() {
             //   connection.query("SELECT * FROM products", [0], function (error, response) {
                        //console.log(response);
               //     }
                    //response1 = response;
                    //prompt();
                    
               // );    
               console.log(response1[idNum].stock_quantity);
               console.log(numUnits);
               console.log(idNum);
           // };
            updateDatabase();
        };
            connection.end();
            //response2 = response1;   
           // idNum2 = idNum;
            //numUnits2 = numUnits;
            //updateDatabase();
        });
    };
   //});
//}

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

    //function (error, response) {
      // console.log("Item ID: " + response[i].item_id + " | Product Name: " + response[i].product_name + " | Price: " + response[i].price);
    //console.log(response);  
    )};

let customer = function() {
    connection.query("SELECT * FROM products", [0], function (error, response) {
        for (let i = 0; i < response.length; i++) {
            console.log("Item ID: " + response[i].item_id + " | Product Name: " + response[i].product_name + " | Price: " + response[i].price);
        }
        response1 = response;
        prompt();
    });    
};

customer();

//prompt();
//inquirer.prompt()