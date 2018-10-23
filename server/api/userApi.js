
let models = require('../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let $sql = require('../sqlMap');
const fs = require('fs');

// 连接数据库
let conn = mysql.createConnection(models.mysql);

conn.connect();
let jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
// 增加用户接口
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add;
  let sql_user=$sql.user.select_name;
  let params = req.body;

  for(let i in params){
    conn.query(sql_user,[params[i].username],(err, result) => {
      if(result !== null){
        res.send({
          msg:`用户${params[i].username}已经存在`,
          code:-1
        })
      }else{
        conn.query(sql, [params[i].username, params[i].password], (err, result) => {
          res.send({
            msg:"注册成功",
            code:0
          })
        })
      }
    });
  }
});
router.post('/selectUser', (req,res) => {
  let sql_user=$sql.user.sel_user;
  let params = req.body;
  for(let i in params) {
    conn.query(sql_user,[params[i].username,params[i].password],(err,result) => {
      if (result.length === 0) {
        res.send({
          msg:'用户名或者密码错误',
          code:-1
        })
      }else{
        res.send({
          msg:'登录成功',
          code:1
        })
      }
    })
  }
});
router.post('/update',(req,res) => {
  let params = req.body;
  let sql_update = $sql.user.update_password;
  for(let i in params){
    conn.query(sql_update,params[i].username,params[i].id,(err,result) => {
      if (result === []) {
        res.send('-1')
      }else{
        jsonWrite(res, result);
      }
    })
  }
})
router.post('/file-upload', function(req, res) {
  // 获得文件的临时路径
  let tmp_path = req.files.thumbnail.path;
  let target_path = './public/images/' + req.files.thumbnail.name;
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    // 删除临时文件夹文件,
    fs.unlink(tmp_path, function () {
      if (err) throw err;
      res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
    });
  });
});
module.exports = router;
