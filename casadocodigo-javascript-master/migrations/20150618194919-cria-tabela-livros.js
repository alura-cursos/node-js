var dbm = global.dbm || require('db-migrate');

exports.up = function(db, callback) {
  console.log(callback);
  db.createTable('livros', {
    id: { type: 'int', primaryKey: true,autoIncrement: true },
    titulo: 'string',
    descricao: 'text',
    preco: {type: 'decimal'}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('pets', callback);
};
