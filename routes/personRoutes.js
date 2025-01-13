const express = require('express');

const router = express.Router();

const Person = require('../models/Person');

// HTTP --> POST Request for to send Person data
router.post('/', async function (req, res) {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();

        console.log("Data Saved");

        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
})

// HTTP --> GET Request for to get Person data
router.get('/', async function (req, res) {
    try {
        const response = await Person.find();

        console.log("Data fetched successfully");

        res.status(200).json({ response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// person ka parametrised call
router.get('/:workType', async function (req, res) {
    try {
        const workType = req.params.workType; // extract the work type from the URL parameter

        if (workType == 'Chef' || workType == 'Manager' || workType == 'Waiter') {
            const response = await Person.find({ work: workType });

            console.log("Response fetched");
            res.status(200).json(response);
        }

        else {
            res.status(500).json({ error: 'Invalid work type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// HTTP --> PUT Request for to update Person data
router.put('/:person_id', async function (req, res) {
    try {
        const personId = req.params.person_id; // extract id from URL parameter

        const updatedPersonData = req.body; // updated data for person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // run mongoose validation
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("Data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' });
    }
})

// HTTP --> DELETE Request for to remove Person data
router.delete('/:id', async function (req, res) {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("Data deleted");
        res.status(200).json({ msg: 'Person deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' });
    }
})

module.exports = router;