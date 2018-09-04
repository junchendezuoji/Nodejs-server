const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req,res) => {
  const url = req.url;  //请求的路径
  const filePath = path.join(conf.root, url); //实际的路径

  route(req,res,filePath);

});

server.listen(conf.port,conf.hostname,() => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`Server started at ${chalk.red(addr)}`);
});

