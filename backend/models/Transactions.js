const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Schema

const TransactionSchema = new Schema({
	sender_id: {type: String, required: true},
	receiver_id: {type: String, required: true},
	sender_name: {type: String, required: true},
	receiver_name: {type: String, required: true},
	sender_surname: {type: String, required: true},
	receiver_surname: {type: String, required: true},
	sender_email: {type: String, required: true},
	receiver_email: {type: String, required: true},
	sender_account_balance: {type: Number, required: true},
	receiver_account_balance: {type: Number, required: true},
	sender_account_number: {type: Number, required: true},
	receiver_account_number: {type: Number, required: true},
	reference:  {type: String, required: true},
	amount: {type: Number, required: true},
	transaction_date: {type: Date, default: Date.now},
	

})

module.exports = mongoose.model("transaction", TransactionSchema);