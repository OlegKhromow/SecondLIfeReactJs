const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer")

router.get('/', async (req, res) => {
    try {
        const volunteer = await Volunteer.find();
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const volunteer = await Volunteer.findById(id);
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const volunteer = await Volunteer.find({email: email});
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        const savedVolunteer = await volunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const volunteer = await Volunteer.findByIdAndDelete(id);
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
        if (req.body.surname !== undefined)
            updates.surname = req.body.surname;
        if (req.body.phoneNumber !== undefined)
            updates.phoneNumber = req.body.phoneNumber;
        if (req.body.registrationDate !== undefined)
            updates.registrationDate = req.body.registrationDate;
        if (req.body.email !== undefined)
            updates.email = req.body.email;
        if (req.body.password !== undefined)
            updates.password = req.body.password;
        let volunteer = await Volunteer.findByIdAndUpdate(id, updates, {new: true});
        res.status(201).json(volunteer);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;