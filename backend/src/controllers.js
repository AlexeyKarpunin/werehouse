const mysql = require('mysql');
const db = require('./db');


const SQL_SELECT_ALL_FROM_ITEMS = 'SELECT * FROM `items`;';
const SQL_SELECT_ITEM_BY_ITEM_ID = 'SELECT * FROM `items` WHERE `item_id` = ?';

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
  const SQL_INSERT_ITEM_INTO_ITEM = mysql.format('INSERT INTO `items` (name) VALUES (?);', [name]);
  const data = await db.query(SQL_INSERT_ITEM_INTO_ITEM);

  res.json(data);
};

const createLog = async (req, res) => {
  const {itemId, amount} = req.body;
  const SQL_INSERT_DOC_INTO_LOG = `INSERT INTO log (itemId, amount) VALUES (${itemId}, ${amount});`;
  const data = await db.query(SQL_INSERT_DOC_INTO_LOG);

  res.json(data);
};

module.exports = {
  getItemList,
  getItem,
  createItem,
  createLog,
};
