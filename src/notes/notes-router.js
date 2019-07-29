const path = require('path')
const express = require('express')
const xss = require('xss')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    folderid: note.folderid,
    title: xss(note.title),
    content: xss(note.content),
    modified: note.modified
})

notesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getAllNotes(knexInstance)
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { id, title, content, folderid } = req.body;
        let newNote;
        if (id) {
            newNote = { id, title, content, folderid }
        } else {
            newNote = { title, content, folderid }
        }

        NotesService.insertNote(knexInstance, newNote)
            .then(note => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(serializeNote(note))
            })

    })

notesRouter
    .route('/:noteId')
    .all((req, res, next) => {
        NotesService.getById(
          req.app.get('db'),
          req.params.noteId
        )
          .then(note => {
            if (!note) {
              return res.status(404).json({
                error: { message: `Note doesn't exist` }
              })
            }
            res.note = note
            next()
          })
          .catch(next)
      })
    .get((req, res, next) => { res.json(serializeNote(res.note)) })
    .delete((req, res, next) => {
        NotesService.deleteNote(req.app.get('db'), req.params.noteId)
            .then(response => {
                res.status(204)
                    .end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { id, title, folderid, content } = req.body;
        const newNote = { id, title, folderid, content };
        const numberOfValues = Object.values(newNote).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: 'Request body must contain id, title, folderid, or content'
                }
            })
        }
        NotesService.updateNote(req.app.get('db'), req.params.noteId, req.body)
            .then(response => {
                res.status(204).end()
            })
            .catch(next)
    })
module.exports = notesRouter;