function ProdutoDao(connection) {
    this._connection = connection;
}

ProdutoDao.prototype.salva = function(livro,callback) {
    this._connection.query('INSERT INTO livros SET ?', livro, callback);
}

ProdutoDao.prototype.lista = function(callback) {
    this._connection.query('select * from livros',callback);
}

ProdutoDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from livros where id = ?",[id],callback);
}

module.exports = function(){
    return ProdutoDao;
};