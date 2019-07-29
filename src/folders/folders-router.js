const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    title: xss(folder.title)
});

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        FoldersService.getAllfolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        //console.log(req.app)
        const { title, id } = req.body;
        let newFolder;
        if (id) {
            newFolder = { id, title }
        } else {
            newFolder = { title }
        }

        FoldersService.insertFolder(knexInstance, newFolder)
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json(serializeFolder(folder))
            })
            .catch(next)
    })



foldersRouter
    .route('/:folderId')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db');
        FoldersService.getById(knexInstance, req.params.folderId)
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: 'Oopsie poopsie!!! I can\'t find that DX' }
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db');
        FoldersService.deleteFolder(knexInstance, req.params.folderId)
            .then(response => res
                                .status(204)
                                .json({ message: `Folder with id ${req.params.folderId} deleted.` })
                                .end())
            .catch(next)
    })

module.exports = foldersRouter;