const imovelController = require('./imovelController');

module.exports = (app) => {
    app.post('/imovel', imovelController.post);
    app.put('/imovel/:id', imovelController.put);
    app.delete('/imovel/:id', imovelController.delete);
    app.get('/imovel', imovelController.get);
    app.get('/imovel/:id', imovelController.getById);
};