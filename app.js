var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://127.0.0.1:8080/myproject';

MongoClient.connect(url,function(err,db){
	assert.equal(null,err);
	console.log("Successfully connected to the database");

	insertDocuments(db,function(){
		updateDocument(db,function(){
			findAllDocuments(db,function(){
				removeDocument(db,function(){
					findAllDocuments(db,function(){
						db.close();
					})
				})
			})
		})
	})
});

var insertDocuments = function(db,callback){
	var documents = db.collection('documents');

	documents.insert([{a : 1 } , {a : 2} , {a:3}],function(err,result){
		assert.equal(err,null);
		console.log("Inserted " + result.result.n + " documents in the collection.");
		callback(result);
	});
}

var updateDocument = function(db,callback){
	var documents = db.collection('documents');

	documents.update({a:1},{$set: {a:4} },function(err,result){
		console.log("Updated " + result.result.n + " document(s) in the collection");
		callback(result);
	});
}

var removeDocument = function(db,callback){
	var documents = db.collection('documents');

	documents.remove({a:3} , function(err,result){
		console.log("Removed " + result.result.n + " documents");
	});
}

var findAllDocuments = function(db,callback){
	var documents = db.collection('documents');
	console.log("I am here. Fuck Yeah !. Where r u ?");
	documents.find({}).toArray(function(err,docs){
		console.log("Find following records", docs);
		callback(docs);
	});
}