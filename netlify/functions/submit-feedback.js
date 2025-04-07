const { MongoClient } = require("mongodb");
require("dotenv").config();

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { fullName, email, message, timestamp } = JSON.parse(event.body);

  if (!fullName || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("feedbacks");
    await collection.insertOne({ fullName, email, message, timestamp });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback submitted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving feedback", error }),
    };
  } finally {
    await client.close();
  }
};
