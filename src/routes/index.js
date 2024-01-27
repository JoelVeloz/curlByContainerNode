const express = require('express');
const exec = require('child_process').exec;

// const 
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/curl/:ip", function (req, res) {
  const ip = req.params.ip;
  const cmd = `curl ${ip}`;
  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    res.send(`stdout: ${stdout}`);
  });

});
module.exports = router;
