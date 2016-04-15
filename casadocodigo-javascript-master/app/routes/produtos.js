module.exports = function(app) {
    app.get("/produtos/form",function(req, res) {
        res.render('produtos/form',{produto:{},validationErrors:{}});
    });

    app.post("/produtos",function(req,res) {
        var produto = req.body;
        console.log(produto);

        var validadorTitulo = req.assert('titulo', 'Titulo deve ser preenchido');
        validadorTitulo.notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.format({
                html: function(){
                    res.status(400).render("produtos/form",{validationErrors:errors,produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });
            return ;
        }

        var connection = app.infra.connectionFactory();
        var produtoDao = new app.infra.ProdutoDao(connection);


        produtoDao.salva(produto,function(exception,result){
            if(!exception) {
                res.redirect("/produtos");
            }
        });

        connection.end();


    });


    app.get("/produtos",function(req,res) {

        var connection = app.infra.connectionFactory();
        var produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.lista(function(error,results,fields){


            res.format({
                html: function(){
                    res.render("produtos/lista",{lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });

        })
        connection.end();
    });

    app.get("/produtos/:id",function(req,res) {
        var connection = app.infra.connectionFactory();
        var produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.buscaPorId(req.params.id,function(error,results,fields){
            if(results.length == 0){
                res.status(404).send();
                return ;
            }
            res.json(results);
        });

        connection.end();
    });
}