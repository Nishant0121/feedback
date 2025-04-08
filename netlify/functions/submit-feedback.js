const { MongoClient } = require("mongodb");
require("dotenv").config();

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { name, email, message } = JSON.parse(event.body);
  console.log(name, email, message);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  const timestamp = new Date().toISOString();

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("feedbacks");
    await collection.insertOne({ name, email, message, timestamp });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback submitted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error saving feedback",
        error: error.message,
      }),
    };
  } finally {
    await client.close();
  }
};
