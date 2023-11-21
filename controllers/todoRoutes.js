const express = require("express");
const router = express.Router();
const { User, Todo } = require("../models");

//find all
router.get("/", (req, res) => {
  Todo.findAll()
    .then((dbTodos) => {
      res.json(dbTodos);
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
//find one
router.get("/:id", (req, res) => {
  Todo.findByPk(req.params.id, {
    include: [User],
  })
    .then((dbTodo) => {
      if (!dbTodo) {
        res.status(404).json({ msg: "no such Todo!" });
      } else {
        res.json(dbTodo);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
//create
router.post("/", (req, res) => {
  if (!req.session.user) {
    res.status(403).json({ msg: "login first to join the club!" });
  } else {
    Todo.create({
      task: req.body.task,
      isComplete: req.body.isComplete,
      UserId: req.session.user.id,
    })
      .then((newTodo) => {
        res.json(newTodo);
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  }
});
//edit
router.put("/:id", (req, res) => {
  Todo.update(
    {
      task: req.body.task,
      isComplete: req.body.isComplete,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editTodo) => {
      if (!editTodo[0]) {
        res.status(404).json({ msg: "no such Todo!" });
      } else {
        res.json(editTodo);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
//delete
router.delete("/:id", (req, res) => {
  Todo.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delTodo) => {
      if (!delTodo) {
        res.status(404).json({ msg: "no such Todo!" });
      } else {
        res.json(delTodo);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});

module.exports = router;
