const express = require('express')
const {
  getAllAudioStreams,
  updateAudioStream
} = require('../controllers/audioController')

const router = express.Router()

router.get('/', getAllAudioStreams)
router.post('/', updateAudioStream)
module.exports = router
