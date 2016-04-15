var http = require('http');

var config = {
    hostname: 'localhost',
    port:3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
   }

};

var postData = {titulo: '',
    preco: 100,
    descricao: 'descricao do livro'
};

var request = http.request(config, function(res) {
    console.log(res.statusCode);
    res.on('data', function (body) {
        console.log('BODY: ' + body);
    });
});

//request.write(postData);
console.log(JSON.stringify(postData)+"");
request.end(JSON.stringify(postData));