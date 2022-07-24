const express = require("express");
const constacts = require("../controllers/contact-book.controller");

const router = express.Router();

router .route("/")
    .get(constacts.findAll)
    .post(constacts.create)
    .delete(constacts.deleteAll);

router 
    .route("/favorite")
    .get(constacts.findAllFavorite);
    
router
    .route("/:id")
    .get(constacts.findOne)
    .put(constacts.update)
    .delete(constacts.delete);

module.exports=router;