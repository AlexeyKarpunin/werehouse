/* eslint-disable max-len */
const mysql = require('mysql');
const db = require('./db');


const SQL_SELECT_ALL_FROM_ITEMS = 'SELECT * FROM `items`;';
const SQL_SELECT_ITEM_BY_ITEM_ID = 'SELECT * FROM `items` WHERE `item_id` = ?';
const SQL_INSERT_ITEM_INTO_ITEM = 'INSERT INTO `items` (name) VALUES (?)';

const SQL_INSERT_DOC_INTO_LOG = 'INSERT INTO log (item_id, amount, document_id) VALUES (?,?,?);';
const SQL_INSERT_DOCUMENT = 'INSERT INTO document (time) VALUES (?);';

const getItemList = async (req, res) => {
  const query = mysql.format(SQL_SELECT_ALL_FROM_ITEMS);
  const data = await db.query(query);
  res.json(data);
};

const getItem = async (req, res) => {
  const {itemId} = req.params;
  const query = mysql.format(SQL_SELECT_ITEM_BY_ITEM_ID, [itemId]);
  const data = await db.query(query);

  res.json(data);
};

const createItem = async (req, res) => {
  const {name} = req.body;
  const query = mysql.format(SQL_INSERT_ITEM_INTO_ITEM, [name]);
  const data = await db.query(query);
  res.json(data);
};

const createLog = async (req, res) => {
  const {items} = req.body; // items is array whith objects => [{itemId: 1, amount: 4}, {}, {} ...]
  const dataTime = new Date();
  const queryDoc = mysql.format(SQL_INSERT_DOCUMENT, [dataTime]); // create document;
  const docInsert = await db.query(queryDoc);
  const documentId = docInsert.insertId;
  const parseItems = JSON.parse(items);
  for (let i = 0; i < parseItems.length; i++) {
    const queryLog = mysql.format(SQL_INSERT_DOC_INTO_LOG, [parseItems[i].itemId, parseItems[i].amount, documentId]); // create log;
    await db.query(queryLog);
  }

  // const data = await db.query(query);

  res.json({message: 'Success'});
};

module.exports = {
  getItemList,
  getItem,
  createItem,
  createLog,
};
