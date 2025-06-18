// appwriteConfig.js

import { Account, Client, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("685293dc001a88e8f9ee"); // Your Project ID

const account = new Account(client);

export { account, ID };
