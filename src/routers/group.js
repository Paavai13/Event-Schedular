const express = require('express')
const Group = require('../models/group')
const router = new express.Router()

router.post('/groups', async (req, res) => {
    const group = new Group(req.body)

    try {
        await group.save()
        res.status(201).send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find({})
        res.send(groups)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/groups/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const group = await Group.findById(_id)

        if (!group) {
            return res.status(404).send()
        }

        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/groups/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title','description','public','users']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const group = await Group.findById(req.params.id)

        updates.forEach((update) => group[update] = req.body[update])
        await group.save()

        if (!group) {
            return res.status(404).send()
        }

        res.send(group)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id)

        if (!group) {
            res.status(404).send()
        }

        res.send(group)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router