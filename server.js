const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const TransactionsSchema = require("./Schema/SchemaTransactions");
const Account = require("./Schema/SchemaAccounts");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Accounts = [];
var Transactions = [];
var referanceNumber = 1;
var AccountNumber = 1;

//Create Account and Confirm

app.post("/createAccount", (req, res) => {
  let result = Account.validate(req.body);
  referanceNumber++;
  var isError = true;
  if (result.error) {
    const message = result.error.message;
    res.status(404).send({ isError, referanceNumber, message }).end();
    console.log(result.error.message);
  } else {
    const { currencyCode, balance } = req.body;
    isError = false;
    AccountNumber++;

    Accounts.push({ AccountNumber, currencyCode, balance, referanceNumber });

    res.status(200).send({ isError, referanceNumber }).end();
  }
});

//Create Transactions and Confirm

app.post("/createTransaction", (req, res) => {
  let result = TransactionsSchema.validate(req.body);
  referanceNumber++;
  var isError = true;
  if (result.error) {
    const message = result.error.message;
    res.status(404).send({ isError, referanceNumber, message }).end();
  } else {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

    const Temp = Accounts.filter((temp) => {
      return (
        temp.AccountNumber == senderAccountNumber ||
        temp.AccountNumber == receiverAccountNumber
      );
    });
    const senderAmount = Temp.find(
      (temp) => temp.AccountNumber == senderAccountNumber
    );
    const receiverAmount = Temp.find(
      (temp) => temp.AccountNumber == receiverAccountNumber
    );

    if (Temp.length === 2 && Temp[0].currencyCode === Temp[1].currencyCode) {
      if (senderAmount.balance < amount) {
        return res
          .status(200)
          .send({
            isError,
            referanceNumber,
            error: "insufficient balance error",
          })
          .end();
      }

      senderAmount.balance = senderAmount.balance - amount;
      receiverAmount.balance = Number(amount) + Number(receiverAmount.balance);

      Transactions.push({
        senderAccountNumber,
        receiverAccountNumber,
        amount,
        referanceNumber,
      });
      return res.status(200).send({ referanceNumber, isError: false }).end();
    }

    res.status(404).send({ isError, referanceNumber }).end();
  }
});

//And get List

app.get("/getTransactions", (req, res) => {
  res.status(200).send(Transactions).end();
});

app.get("/getAccounts", (req, res) => {
  res.status(200).send(Accounts).end();
});

app.listen(3000);
