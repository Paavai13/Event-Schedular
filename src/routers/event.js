const express = require('express')
const Event = require('../models/event')
const router = new express.Router()

router.post('/events', async (req, res) => {
    const event = new Event(req.body)

    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find({})
        res.send(events)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/events/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const event = await Event.findById(_id)

        if (!event) {
            return res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/events/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description','date','venue','owner']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const event = await Event.findById(req.params.id)

        updates.forEach((update) => event[update] = req.body[update])
        await event.save()

        if (!event) {
            return res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)

        if (!event) {
            res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router