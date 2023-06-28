//Import our Controllers
const petsController = require('../controllers/pets.controller');

//Declare our routes
module.exports = (app) => {
    app.post('/api/pets/new', petsController.createPet);
    app.get('/api', petsController.getPets);
    app.get('/api/pets/:id', petsController.getPet);
    app.put('/api/pets/:id/edit', petsController.updatePet);
    app.delete('/api/pets/:id', petsController.deletePet);
};