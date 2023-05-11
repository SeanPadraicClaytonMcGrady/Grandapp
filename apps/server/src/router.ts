import express from 'express'
import VolunteersController from './controllers/volunteers.controller'


const router = express.Router()


//
router.post('/volunteers', VolunteersController.create)

export default router