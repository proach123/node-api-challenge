const express = require("express");

const db = require("./helpers/projectModel"); // < fix the path

const actionDb = require("./helpers/actionModel")

const router = express.Router(); // mind the uppercase R

// middleware

// route handlers - handles what comes after /api/db

router.get("/", (req, res) => {
    db.get().then(
        db => {
            res.status(200).json(db)
        }
    ).catch(
        err =>{
            console.log(err)
            res.status(500).json({
                messages: "Error retriving the db"
            })
        }
    )
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    db.getProjectActions(id).then(
        db => {
            res.status(200).json(db)
        }
    ).catch(
        err =>{
            console.log(err)
            res.status(500).json({
                messages: "Error retriving the db"
            })
        }
    )
})


  router.post("/", (req, res) => {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error adding the db",
        });
      });
  });


  router.put("/:id", (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error updating the db",
        });
      });
  });

  router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The project has been destroyed" });
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error removing the db",
        });
      });
  });

  router.get("/:id/actions", (req, res) => {
     const {id} = req.params
    actionDb.get(id).then(
        db => {
            res.status(200).json(db)
        }
    ).catch(
        err =>{
            console.log(err)
            res.status(500).json({
                messages: "Error retriving the db"
            })
        }
    )
})

router.post("/:id/actions", (req, res) => {
    actionDb.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error adding the db",
        });
      });
  });

router.put("/:id/actions", (req, res) => {
    const changes = req.body;
    actionDb.update(req.params.id, changes)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error updating the db",
        });
      });
  });

  router.delete("/:id/actions", (req, res) => {
    actionDb.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The action has been destroyed" });
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error removing the db",
        });
      });
  });



module.exports = router;
