module.exports = function(app) {
    app.get("/",function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtos = new app.infra.ProdutoDao(connection);

        produtos.lista(function(error,results,fields){
            res.render('home/index',{livros:results});
        });
        connection.end();

    });
}