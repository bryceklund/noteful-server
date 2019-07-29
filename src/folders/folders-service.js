const FoldersService = {
        getAllfolders(knex) {
          return knex.select('*').from('folders')
        },
        insertFolder(knex, folder) {
          return knex
            .into('folders')
            .insert(folder)
            .returning('*')
            .then(rows => {
              return rows[0]
            })
        },
        getById(knex, id) {
          return knex
            .from('folders')
            .select('*')
            .where('id', id)
            .first()
        },
        deleteFolder(knex, id) {
          return knex('folders')
            .where({ id })
            .delete()
        }
      }
      
module.exports = FoldersService;