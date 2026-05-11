const router = require('express').Router()
const Car = require('../models/Car')
const verifyToken = require('../middleware/verify-token')

router.post('/', verifyToken, async (req, res) => {
    try {
        const createdCar = await Car.create(req.body)
        res.status(201).json({ car: createdCar })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const cars = await Car.find({})
        res.json({ cars })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) return res.status(404).json({ err: 'Car not found' })
        res.json({ car })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!updated) return res.status(404).json({ err: 'Car not found' })
        res.json({ car: updated })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleted = await Car.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ err: 'Car not found' })
        res.json({ message: 'Car deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

module.exports = router
module.exports = router