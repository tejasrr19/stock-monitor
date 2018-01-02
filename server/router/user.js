const Koa = require('koa');
const router = require('koa-router')();
const request = require('request-promise');
const cors = require('koa-cors');
const app = new Koa();