const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel=require('./models/account')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register', (req, res) => {
    var username=req.body.username;
    var password=req.body.password;

    AccountModel.findOne({
      username: username
    })
    .then(data=>{
      if(data){
        res.json('user này đã tồn tại')
      }else{
        return AccountModel.create({
          username: username,
          password: password
        })
      }
    })
    .then(data=>{
      res.json('tao tai khoan thanh cong')
    })
    .catch(err=>{
      res.status(500).json('tao tai khoan that bai')
    })
})

app.post('./login', (req, res, next)=>{
  var username=req.body.username;
  var password=req.body.password;
  
  AccountModel.findOne({
    username: username,
    password: password
  })
  .then(data => {
    if(data){
      res.json('dang nhap thanh cong')
    }else{
      res.status(500).json('dang nhap that bai')
    }
  })
  .catch(data=>{
    res.status(500).json('co lỗi bên server')
  })
})

var accountRouter=require('./routers/account')

app.use('/api/account/', accountRouter)

app.get('/', (req, res) => {
  res.json('Home!')
})

app.listen(3000, () => {
  console.log(`server started on port`)
})