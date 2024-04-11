const express = require("express");
const router = express.Router();
const Category = require("../models/Category")

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const categories = await Category.findById(id);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const categories = await Category.find({name: name});
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndDelete(id);
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
        let category = await Category.findByIdAndUpdate(id, updates, {new: true});
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;