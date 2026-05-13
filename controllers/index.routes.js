const router = require('express').Router()

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Project4 API', status: 'ok' })
})

module.exports = router

