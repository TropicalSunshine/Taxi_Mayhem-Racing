
const express = require("express");

const router = express.Router();

var server = require('http').Server(router);

var socket = require("socket.io")(server);
