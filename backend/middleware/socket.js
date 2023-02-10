const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

/* Schemas  transaction transaction schema will be used when doing alerts and user schemas*/

const Transaction = require('../models/Transactions');
const User = require('../models/User');

module.exports = (app,  io, db) =>{
	io.on('connection', function(socket){
		// Join every user to the roomid
		socket.on('joinService', ({roomID}) => {
			socket.join(roomID)
			
		})

		//Managing send events
		socket.on(
			'send', 
			({amount, account_number, purpose, sender, roomID}, 
			callback) =>{
				
				User.findOne({account_number}).then(user => {
					if(!user) return callback({error:'Sorry not permitted'});
					//console.log('sender: '+sender)
					
					//console.log('receiver: '+user.email)
					// get user account and update balance
					const account_balance = user.account_balance + amount;
					
					// update

					User.findOneAndUpdate(
						{account_number},
						{$set: {account_balance}},
						{new: true},
						(err) => {
							if(err) return callback({error: 'Not updated'})
							
							//Update senders account balance
							User.findOne({email: sender}).then((sentBy) => {
								//console.log('sent by: '+sentBy.account_balance - amount)
								//console.log('amount: '+amount)
								const newSenderBalance = sentBy.account_balance - amount;
								
								//update senders account balance
							
								User.findOneAndUpdate({
									account_number: sentBy.account_number,
									
								},
									{$set: {account_balance: newSenderBalance}},
							
									{new: true},
									
									async () => {
										//console.log('payment complete the sender is '+sender)
										//console.log('payment complete the receiver email is '+user.email)
										//console.log('payment complete user balance is '+sentBy.account_balance)
										//console.log('new sender balance '+newSenderBalance)
										const newTransaction = new Transaction({
											sender_id: sentBy.id,
											receiver_id:user.id, 
											sender_name: sentBy.name,
											receiver_name:user.name, 
											sender_surname: sentBy.surname,
				
											receiver_surname:user.surname, 
				
											sender_email: sentBy.email,
											receiver_email:user.email,
											sender_account_balance: sentBy.account_balance,
											receiver_account_balance:user.account_balance, 
											sender_account_number: sentBy.account_number,
											receiver_account_number: user.account_number,
											reference: purpose,
											amount,
				
										})
										//console.log(newTransaction)
										newTransaction.save().then(async (transaction) => {
											if (!transaction) return res.status(400).json({msg: "Transaction not saved"})
											//console.log('transaction saved')
											const transactions =
												[{
													id: transaction.id, 
													sender_name: transaction.sender_name,
													receiver_name:transaction.receiver_name, 
													sender_surname: transaction.sender_surname,
													receiver_surname:transaction.receiver_surname, 
													sender_email: transaction.sender_email,
													receiver_email:transaction.receiver_email,
													sender_account_number: transaction.sender_account_number,
													receiver_account_number: transaction.receiver_account_number,
													price:transaction.amount,
													reference:transaction.reference,
													transaction_date:transaction.transaction_date,
													
						
												}]
												//console.log(transactions)
											//console.log('transaction sent start')
											await socket.emit('transactionSent', {
													id: transactions.id, 
													sender_name: transactions.sender_name,
													receiver_name:transactions.receiver_name, 
													sender_surname: transactions.sender_surname,
													receiver_surname:transactions.receiver_surname, 
													sender_email: transactions.sender_email,
													receiver_email:transactions.receiver_email,
													sender_account_number: transactions.sender_account_number,
													receiver_account_number: transactions.receiver_account_number,
													price:transactions.amount,
													reference:transactions.reference,
													transaction_date:transactions.transaction_date,
													type:'receive'
												})
											
			
										})
										
												
										
										
										//console.log('money sent start')
										socket.broadcast.to(roomID).emit('moneySent', {
											amount,
											purpose,
											user,
											receiver: user.email,
											sender,
											receiver_account_number: user.account_number,
											sender_account_number: sentBy.account_number
										})
									}
								);
							})
						}
					)
				})
			}
		)
	})
};