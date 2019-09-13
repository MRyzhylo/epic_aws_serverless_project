'use strict';

const AWS = require('aws-sdk');
const db = AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10"});
const uuid = require('uuid');

const postsTable = process.env.POSTS_TABLE;

function responce (statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

function sortByDate (a,b) {
  if(a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
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

module.exports.getAllPosts = (event, context, callback) => {
  return db.scan({
    TadleName: postsTable
  }).promise().then(res => {
    callback(null, responce(200, res.Item.sort(sortByDate)))
  }).catch(err => responce(null, responce(err.statusCode, err)))
}