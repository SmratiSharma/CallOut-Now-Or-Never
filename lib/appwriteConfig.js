// lib/appwriteConfig.js
import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('685293dc001a88e8f9ee'); 
const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
