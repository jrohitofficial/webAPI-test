const express = require("express");
const router = express.Router();

//Importing model.
const Todo = require("../models/Todo");

const { verifyUser, verifyUserToWrite } = require("../middleware/auth");

router
  .route("/")
  .get(verifyUser, (req, res, next) => {
    Todo.find({ user: req.user.id })
      .then((todo) => {
        if (!todo) return res.status(404).json({ error: "Todo not found." });
        res.json(todo);
      })
      .catch(next);
  })
  .post(verifyUserToWrite, (req, res, next) => {
    Todo.create(req.body)
      .then((book) => res.status(201).json(book))
      .catch(next);
  })
  .delete(
    verifyUserToWrite,

    (req, res, next) => {
      Todo.deleteMany()
        .then((reply) => res.json(reply))
        .catch(next);
    }
  );

router
  .route("/:id")
  .get(
    verifyUserToWrite,

    (req, res, next) => {
      Todo.findById(req.params.id)
        .then((todo) => {
          //Custom error
          if (!todo) {
            res.status(404).json({ error: "Todo bot found" });
          }
          res.json(todo);
        })
        .catch(next);
    }
  )

  .put(
    verifyUserToWrite,

    (req, res, next) => {
      Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updated) => res.json(updated))
        .catch(next);
    }
  )

  .delete(
    verifyUserToWrite,

    (req, res, next) => {
      Todo.findByIdAndDelete(req.params.id)
        .then((reply) => res.json(reply))
        .catch(next);
    }
  );

module.exports = router;
