var express = require('../../config/express')()
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');

describe('#ProdutosController', function() {

    beforeEach(function(done) {
        databaseCleaner.clean(express.infra.connectionFactory(), function(){
            done();
        });
    });

    after(function(done) {
        databaseCleaner.clean(express.infra.connectionFactory(), function(){
            done();
        });
    });


    it('#listagem de produtos json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done)

    });

    it('#listagem de produtos html', function (done) {
        request.get('/produtos')
            .expect('Content-Type', /html/)
            .expect(200,done)

    });

    it('#cadastro de um novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:"",descricao:"livro de teste"})
            .expect(400,done)

    });

    it('#cadastro de um novo produto com tudo preenchido', function (done) {
        request.post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302)
            .end(function(err,response){
                done();
            })

    });





});