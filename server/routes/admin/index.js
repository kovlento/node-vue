module.exports = app => {
    const express = require('express');
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
        let queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
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
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../moudels/${modelName}`)
        next()
    }, router)


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {

        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(req.file)
    })
}