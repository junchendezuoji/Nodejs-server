const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function (req,res,filePath) {
  
  try {
    const stats = await stat(filePath); //await后面跟promise，等待其完成后执行下一步
    
    if(stats.isFile()){
      res.statueCode = 200;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      fs.createReadStream(filePath).pipe(res); //创建读取文件数据流，并将其导入响应体
    } else if(stats.isDirectory()) {
      const files = await readdir(filePath);

      res.statueCode = 200;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(files.join(','));
    } //如果能读取到文件或者文件夹

  } catch(ex) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`${filePath} is not a director or file`);
  } //用try catch的方式解决异步回调

}