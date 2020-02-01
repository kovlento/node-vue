const express = require('express')

const app = express()

//设置秘钥
app.set('secret', 'qweqw34sd')

app.use(require('cors')())
app.use(express.json())
// 静态托管文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
