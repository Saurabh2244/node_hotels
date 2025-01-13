const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');

// HTTP --> POST Request for to send Menu data
router.post('/', async function (req, res) {
    try {
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();

        console.log("Data Saved");

        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// HTTP --> GET Request for to get Menu data
router.get('/', async function (req, res) {
    try {
        const response = await MenuItem.find();

        console.log("Data fetched successfully");

        res.status(200).json({ response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// menuItem ka parametrised call
router.get('/:tasteType', async function (req, res) {
    try {
        const tasteType = req.params.tasteType;

        if (tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy') {
            const response = await MenuItem.find({ taste: tasteType });
            console.log("Response fetched");
            res.status(200).json(response);
        }

        else {
            res.status(500).json({ error: 'Invalid taste type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// HTTP --> PUT Request for to update Menu data
router.put('/:id', async function (req, res) {
    try {
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log("Data updated");
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' });
    }
})

// HTTP --> DELETE Request for to remove Menu data
router.delete('/:id', async function (req, res) {
    try {
        const menuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log("Data updated");
        res.status(200).json({ msg: 'Person deleted successfully' });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' });
    }
})

// export router using module
module.exports = router;