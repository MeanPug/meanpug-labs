package com.labs.meanpug.bpm;

import com.mongodb.ConnectionString;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.MongoClientSettings;

import java.util.Map;

import org.bson.Document;

public class ActionLogsWriter {
	private String dbHost;
	private int dbPort;
	private String dbUsername;
	private String dbPassword;
	private String dbName;
	private String collection;
	
	private MongoClient client = null;
	
	public ActionLogsWriter(String dbHost, int dbPort, String dbUsername, String dbPassword, String dbName, String collection) {
		this.dbHost = dbHost;
		this.dbPort = dbPort;
		this.dbUsername = dbUsername;
		this.dbPassword = dbPassword;
		this.dbName = dbName;
		this.collection = collection;
		
		this.client = this.getConnection();
	}	
	
	public void writeLog(String processId, String event, String message) {
		final MongoDatabase db = this.getDb();
		
		MongoCollection<Document> collection = db.getCollection(this.collection);		
		
		Document log = new Document();
		log.append("processId", processId)
		.append("event", event)
		.append("message", message)
		.append("notified", false);		
		
		collection.insertOne(log);
	}
	
	private MongoClient getConnection() {		
		MongoClientSettings settings = MongoClientSettings
				.builder()
				.credential(MongoCredential.createScramSha1Credential(this.dbUsername, "admin", this.dbPassword.toCharArray()))
				.applyConnectionString(new ConnectionString(String.format("mongodb://%s:%s", this.dbHost, this.dbPort)))
				.build();
		
		return MongoClients.create(settings);
	}
	
	private MongoDatabase getDb() {
		return this.client.getDatabase(this.dbName);
	}
}
