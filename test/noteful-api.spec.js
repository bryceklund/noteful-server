const knex = require('knex');
const app = require('../src/app');
const testData = require('./test-data.fixtures');

describe('Folders Endpoints', () => {
    const testFolders = testData.folders;
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    });
    before('clear the tables', () => 
        db.raw('TRUNCATE TABLE notes, folders CASCADE')
    )
    after('disconnect from the db', () => db.destroy())

    describe('GET /api/folders', () => {
        context('given there are folders in the db', () => {
            beforeEach('insert folders', () => {
                return db('folders').insert(testFolders);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE folders CASCADE')
            })

            it(`GET /api/folders responds with 200 and all folders`, () => {
                return supertest(app)
                        .get('/api/folders')
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, testFolders)
            })
        })
        context(`given no folders`, () => {
            it(`responds with 404 and an empty list`, () => {
                return supertest(app)
                        .get('/api/folders')
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, [])
            })
        })
    })
    describe('GET /folders/:folderId', () => {
        context('given there are folders in the db', () => {
            beforeEach('insert folders', () => {
                return db('folders').insert(testFolders);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE folders CASCADE')
            })
            it(`GET /folders/:folderId returns 200 and the specified folder`, () => {
                const folderId = 2;
                const expectedFolder = testFolders[folderId - 1];
                return supertest(app)
                        .get(`/api/folders/${folderId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, expectedFolder)
            })
        })
        context('given no folders', () => {
            it(`GET /folders/:folderId returns 404 and an error message`, () => {
                const folderId = 12345;
                return supertest(app)
                        .get(`/api/folders/${folderId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(404, {
                            error: { message: 'Oopsie poopsie!!! I can\'t find that DX' }
                        })
            })
        })
    })

    describe('POST /api/folders', () => {
        afterEach('clear the tables', () => {
            return db.raw('TRUNCATE TABLE folders CASCADE')
        })
        it(`POST /api/folders returns 201 and the created folder`, () => {
            const newFolder = {
                title: 'Big Stuff In Here',
                id: 16
            };
            return supertest(app)
                    .post('/api/folders')
                    .send(newFolder)
                    .set({ "Authorization": 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                    .expect(201)
                    .expect(res => {
                        expect(res.body.title).to.eql(newFolder.title)
                        expect(res.body.id).to.eql(newFolder.id)
                        expect(res.headers.location).to.eql(`/api/folders/${newFolder.id}`)
                    })
                    .then(postRes => {
                        return supertest(app)
                                .get(`/api/folders/${postRes.body.id}`)
                                .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                                .expect(postRes.body)
                    })
        })
    })
    describe('DELETE /api/folders/:folderId', () => {
        beforeEach('insert folders', () => {
            return db('folders').insert(testFolders);
        })
        afterEach('clear the tables', () => {
            return db.raw('TRUNCATE TABLE folders CASCADE')
        })
        context('given the folder exists', () => {
            it(`DELETE /api/folders/:folderId returns 204 and the folder is deleted`, () => {
                const folderId = 2;
                const expectedFolders = testFolders.filter(folder => folder.id !== folderId);
                return supertest(app)
                        .delete(`/api/folders/${folderId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(204)
                        .then(res => {
                            return supertest(app)
                                    .get('/api/folders')
                                    .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                                    .expect(expectedFolders)
                        })
            })
        })
        context('given the folder doesn\'t exist', () => {
            it(`DELETE /api/folders/:folderId responds with 404 and an error message`, () => {
                const folderId = 123456;
                return supertest(app)
                        .delete(`/api/folders/${folderId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(404, { error: { message: 'Oopsie poopsie!!! I can\'t find that DX' } })
            })
        })
    })
})

describe('Notes Endpoints', () => {
    const testNotes = testData.notes;
    const testFolders = testData.folders;
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    });
    before('clear the tables', () => db.raw('TRUNCATE TABLE notes, folders CASCADE'))
    before('insert folders', () => db('folders').insert(testFolders))
    after('disconnect from the db', () => db.destroy())

    describe('GET /api/notes', () => {
        context('given there are notes in the db', () => {
            beforeEach('insert notes', () => {
                return db('notes').insert(testNotes);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE notes CASCADE')
            })

            it(`GET /api/notes returns 200 and all notes`, () => {
                return supertest(app)
                        .get('/api/notes')
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, testNotes)
                        
            })
        })
        context('given no notes', () => {
            it(`get /api/notes returns 200 and an empty array`, () => {
                return supertest(app)
                        .get('/api/notes')
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, [])
            })
        })
    })
    describe('GET /api/notes/:noteId', () => {
        context('given the note exists', () => {
            beforeEach('insert notes', () => {
                return db('notes').insert(testNotes);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE notes CASCADE')
            })
            it(`GET /api/notes/:noteId returns 200 and the requested note`, () => {
                const noteId = 4;
                const expected = testNotes[noteId - 1];
                return supertest(app)
                        .get(`/api/notes/${noteId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(200, expected)
            })
        })
        context('given the note does not exist', () => {
            it(`GET /api/notes/:noteId responds with 404 and an error`, () => {
                const noteId = 12345;
                return supertest(app)
                        .get(`/api/notes/${noteId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(404, { error: { message: 'Note doesn\'t exist' } })
            })
        })
    })
    describe('POST /api/notes', () => {
        afterEach('clear the tables', () => {
            return db.raw('TRUNCATE TABLE notes CASCADE')
        })
        it(`POST /api/notes returns 201 and the created note`, () => {
            const newNote = {
                id: 22,
                title: 'Test Note',
                content: 'Love that content!',
                folderid: 2
            }
            return supertest(app)
                    .post('/api/notes')
                    .send(newNote)
                    .set({ "Authorization": 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                    .expect(201)
                    .expect(res => {
                        expect(res.body.id).to.eql(newNote.id)
                        expect(res.body.title).to.eql(newNote.title)
                        expect(res.body.content).to.eql(newNote.content)
                        expect(res.body.folderid).to.eql(newNote.folderid)
                        expect(res.headers.location).to.eql(`/api/notes/${newNote.id}`)
                    })
                    .then(postRes => {
                        return supertest(app)
                                .get(`/api/notes/${postRes.body.id}`)
                                .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                                .expect(postRes.body)
                    })
        })

    })
    describe('DELETE /api/notes/:noteId', () => {
        context('given the note exists', () => {
            beforeEach('insert notes', () => {
                return db('notes').insert(testNotes);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE notes CASCADE')
            })

            it(`DELETE /api/notes/:noteId returns 204 and the note is removed`, () => {
                const idToDelete = 2;
                const expected = testNotes.filter(note => note.id !== idToDelete)
                return supertest(app)
                        .delete(`/api/notes/${idToDelete}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(204)
                        .then(response => {
                            return supertest(app)
                                    .get('/api/notes')
                                    .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                                    .expect(expected)
                        })
            })
        })
        context('given the note doesn\'t exist', () => {
            it(`DELETE /api/notes/:noteId returns 404 and an error message`, () => {
                const noteId = 12345;
                return supertest(app)
                        .delete(`/api/notes/${noteId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(404, { error: { message: `Note doesn't exist` } })
            })
        })
    })
    describe('PATCH /api/notes/:noteId', () => {
        context('given the note exists', () => {
            beforeEach('insert notes', () => {
                return db('notes').insert(testNotes);
            })
            afterEach('clear the tables', () => {
                return db.raw('TRUNCATE TABLE notes CASCADE')
            })
            it(`PATCH /api/notes/:noteId returns 204 and updates the note`, () => {
                const idToUpdate = 2;
                const updatedNote = {
                    title: 'New Title',
                    content: 'New content'
                }
                const expectedNote = {
                    ...testNotes[idToUpdate - 1],
                    ...updatedNote
                }
                return supertest(app)
                        .patch(`/api/notes/${idToUpdate}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .send(updatedNote)
                        .expect(204)
                        .then(res => {
                            return supertest(app)
                                    .get(`/api/notes/${idToUpdate}`)
                                    .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                                    .expect(expectedNote)
                        })
            })
        })
        context('given the note doesn\'t exist', () => {
            it(`PATCH /api/notes/:noteId returns 404 and an error message`, () => {
                const noteId = 12345;
                return supertest(app)
                        .patch(`/api/notes/${noteId}`)
                        .set({ Authorization: 'Bearer 33d5dd60-6329-43f7-a817-1d21f6dece63' })
                        .expect(404, { error: { message: `Note doesn't exist` } })
            })
        })
    })
})