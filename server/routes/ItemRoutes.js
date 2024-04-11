const express = require("express");
const router = express.Router();
const Item = require("../models/Item")

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const items = await Item.findById(id);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/volunteer/:volunteerId', async (req, res) => {
    const id = req.params.volunteerId;
    try {
        const items = await Item.find({volunteerId: id});
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete('/volunteer/:volunteerId', async (req, res) => {
    const id = req.params.volunteerId;
     try {
        const items = await Item.deleteMany({volunteerId: id});
        res.status(200).json(null);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/category/:categoryId', async (req, res) => {
    const id = req.params.categoryId;
    try {
        const items = await Item.find({categoryId: id});
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const items = await Item.findByIdAndDelete(id);
        res.status(200).json(null);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        let updates = {};
        if (req.body.name !== undefined)
            updates.name = req.body.name;
        if (req.body.description !== undefined)
            updates.description = req.body.description;
        if (req.body.addition_date !== undefined)
            updates.addition_date = req.body.addition_date;
        if (req.body.count !== undefined)
            updates.count = req.body.count;
        if (req.body.categoryId !== undefined)
            updates.categoryId = req.body.categoryId;
        if (req.body.volunteerId !== undefined)
            updates.volunteerId = req.body.volunteerId;
        let item = await Item.findByIdAndUpdate(id, updates, {new: true});
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;