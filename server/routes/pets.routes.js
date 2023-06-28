//Import our Controllers
const petsController = require('../controllers/pets.controller');

//Declare our routes
module.exports = (app) => {
    app.post('/pets/new', petsController.createPet);
    app.get('/', petsController.getPets);
    app.get('/pets/:id', petsController.getPet);
    app.put('/pets/:id/edit', petsController.updatePet);
    app.delete('/pets/:id', petsController.deletePet);
};