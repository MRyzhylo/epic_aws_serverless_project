'use strict';

const AWS = require('aws-sdk');
const db = AWS.DynamoDB.DocumentClient();

const postsTable = process.env.POSTS_TABLE;

