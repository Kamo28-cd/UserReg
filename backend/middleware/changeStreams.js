const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//bring in User Model
const Transaction = require("../../models/Transaction");
async function main(client) {
	try {
		await client.connect()
		
		
		await monitorListingUsingEventEmitter(client, 15000)

		

		
	} finally {
		client.close()
	}	
	




	
}

async function monitorListingUsingEventEmitter(client, timeInMs=60000, pipeline = []) {
	//const collection = db("transaction")
	const database = client.db('myFirstDatabase')
	const transactions = database.collection('transaction')	
	
	const changeStream = transactions.watch(pipeline)
	changeStream.on('change', (next) => {
		//console.log('transaction received a change')
	})
			
	await closeChangeStream(timeInMs, changeStream)
}

//closing change stream
	//changeStream is the open change stream that should be closed
	function closeChangeStream(timeInMs = 60000, changeStream) {
		return new Promise((resolve) =>{
			setTimeout(() => {
				//console.log("Closing the change stream");
				changeStream.close()
				resolve()
			}, timeInMs)
		})
	}