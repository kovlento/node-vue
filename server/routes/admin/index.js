module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../moudels/AdminUser')
    const router = express.Router({
        mergeParams: true
    });
    // const Category = require('../../moudels/Category')

    //创建分类名称
    router.post('/', async (req, res) => {

        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //查询分类名称列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //根据id查询详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //更新分类名称
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //更新分类名称
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })


    //登陆授权中间件
    const authMiddleware =  require('../../middleware/auth')

    const resourceMiddleware =  require('../../middleware/resource')


    app.use('/admin/api/rest/:resource', authMiddleware() , resourceMiddleware(), router)


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload',  upload.single('file'), authMiddleware() ,async (req, res) => {

        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(req.file)
    })


    //登陆接口
    app.post('/admin/api/login', async(req, res)=>{
        const { username, password } = req.body   //解构赋值
        //1.根据用户名找用户
        const AdminUser = require('../../moudels/AdminUser')
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user , 422, '用户不存在')
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid , 422, '密码错误')
        //3.返回token
        const  token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send(token)
    })
    //错误处理
    app.use(async(err, req, res, next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}