const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const task = require('../models/task');
const cors = require('cors');

const db = "mongodb://kinhdomcom:kinhdomcom@ds141185.mlab.com:41185/vsbg";
const config = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.log('Connection error');
    } else {
        console.log('Connecting DB')
    }
});
// Read all task
router.get('/posts', function (req, res) {
    console.log('Requesting posts');
    task.find({})
        .exec(function (err, posts) {
            if (err) {
                console.log('Error getting the posts');
            } else {
                res.json(posts);
                console.log('get post ok')
            }
        });
});
// Read 1 task
router.get('/details/:id', function (req, res) {
    console.log('Requesting post');
    console.log(req.params.id)
    task.findById(req.params.id, function (err, post) {
        if (err) {
            console.log('Error getting the post');
        } else {
            res.json(post);
        }
    });
});
// Create task
router.post('/posts', function (req, res) {
    console.log('Posting a task');
    var newTask = new task();
    newTask._id = new mongoose.Types.ObjectId();
    newTask.name = req.body.name;
    newTask.isDone = false;
    console.log(newTask)
    newTask.save(function (err, addedPost) {
        if (err) {
            console.log('Error inserting the post');
            res.json(err)
        } else {
            console.log('insert task success')
            res.json(addedPost);
        }
    });
});
// Update task
router.put('/update', (req, res) => {
    task.findByIdAndUpdate(req.body.id, req.body.taskupdate, { new: true }, (err, taskup) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Đã update thành công ' + taskup)
            res.json(taskup)
        }
    })
})
// Delete Task
router.delete('/delete/:id', function (req, res) {
    console.log('delete.........')
    console.log(req.params.id)
    task.remove({ _id: req.params.id }, (err, taskdeleted) => {
        if (err) throw err
        let response = 'Đã xóa task ' + req.params.id
        res.json(response)
        console.log(response)
    })
})
// Test remove task
// router.get('/test', (err, res) => {
//     res.json({ a: 3 })
//     console.log(new mongoose.Types.ObjectId())
// })

module.exports = router;