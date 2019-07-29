const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    insertNote(knex, content) {
        return knex('notes')
                .insert(content)
                .returning('*')
                .then(rows => {
                    return rows[0]
                })
    },
    getById(knex, id) {
        return knex('notes').select('*').where('id', id).first()
    },
    deleteNote(knex, id) {
        return knex('notes').where({ id }).delete()
    },
    updateNote(knex, id, content) {
        return knex('notes').where({ id }).update(content)
    }
}

module.exports = NotesService;