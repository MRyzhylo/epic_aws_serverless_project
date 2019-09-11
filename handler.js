'use strict';

const AWS = require('aws-sdk');
const db = AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

const postsTable = process.env.POSTS_TABLE;

function responce (statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.createPost = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const post = {
    id: uuid(),
    createdAt: new Date(),
    userId: 1,
    title: reqBoby.title,
    body: reqBody.body
  }
  return db.put({
    TadleName: postsTable,
    Item: post
  }).promise().then(() => {
    callback(null, responce(201,post))
  }).catch(err => responce(null, responce(err.statusCode, err)))
}