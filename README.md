# Bank-API with express js.



---
## Requirements

For development, you will only need Node.js  and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

## Install

    
    $ cd BankApi
    $ npm install


## Running the project

    $ nodemon server.js

## Simple build for production

    $ npm  build
## Usage

  Postman recommended for use. 

   ### http://localhost:3000/getAccounts 
   
     -- gets the list of all accounts. Method is GET

   ### http://localhost:3000/getTransactions 
   
     -- gets the list of all transactions. Method is GET
   
   http://localhost:3000/createAccount
   
    --With postman, required fields are filled from the body part, x-www-form-urlencoded part.Method is POST
     -- “currencyCode” is a string value and can only contain “TRY”, “USD”, “EUR”. (REQUİRED)
     -- “balance” is decimal and precision should be limited to 2.(REQUİRED) 


   http://localhost:3000/createTransaction
   
     --With postman, required fields are filled from the body part, x-www-form-urlencoded part. Method is POST
     -- “senderAccountNumber” is integer. (REQUİRED)
     -- “receiverAccountNumber” is integer. (REQUİRED)
     -- “amount” is decimal and precision should be limited to 2.(REQUİRED) 

