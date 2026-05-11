const router = require('express').Router()
const Booking = require('../models/Booking')
const verifyToken = require('../middleware/verify-token')

router.post('/', verifyToken, async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            username: req.user && req.user._id ? req.user._id : req.body.username,
        }
        const created = await Booking.create(bookingData)
        res.status(201).json({ booking: created })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('username', 'username').populate('carName')
        res.json({ bookings })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('username', 'username').populate('carName')
        if (!booking) return res.status(404).json({ err: 'Booking not found' })
        res.json({ booking })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).json({ err: 'Booking not found' })
        res.json({ booking: updated })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ err: 'Booking not found' })
        res.json({ message: 'Booking deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

module.exports = router
module.exports = router