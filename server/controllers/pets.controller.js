//Import Pets model

const Pets = require('../models/pets.model');

//Create and Save a new Pets
const createPet = (req, res) => {
    Pets.create(req.body)
    .then(newPet => {
        res.json(newPet);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

//Get all Pets
const getPets = (req, res) => {
    Pets.find()
    .then(pets => {
        res.json(pets);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

//Get a single Pet
const getPet = (req, res) => {
    Pets.findById(req.params.id)
    .then(pet => {
        if(!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

//Update a Pet

const updatePet = (req, res) => {
    const { id } = req.params;
    const { name, type, description, skill1, skill2, skill3 } = req.body;

    // Validations
    const errors = {};
    if (!name || name.length < 3) {
        errors.name = 'Name Must Have at least 3 Characters';
    }
    if (!type || type.length < 3) {
        errors.type = 'Type Must Have at least 3 Characters';
    }
    if (!description || description.length < 3) {
        errors.description = 'Description Must Have at least 3 Characters';
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    // Update the pet and increment the likes count
    Pets.findByIdAndUpdate(
        id,
        { name, type, description, skill1, skill2, skill3, $inc: { likes: 1 } },
        { new: true }
    )
        .then((pet) => {
            if (!pet) {
                return res.status(404).json({ message: 'Pet not found' });
            }
            res.json(pet);
            console.log(pet);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

//Delete a Pet

const deletePet = (req, res) => {
    const { id } = req.params;

    Pets.findByIdAndRemove(req.params.id)
    .then(pet => {
        if(!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports = {
    createPet,
    getPets,
    getPet,
    updatePet,
    deletePet
};