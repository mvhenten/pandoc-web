"use strict";

const express = require('express');
const router = express.Router();
const pandoc = require("../lib/pandoc");

router.get("/format", (req, res, next) => {
    res.json({
        input: pandoc.inputFormats,
        output: pandoc.outputFormats
    });
});

router.post("/format", function(req, res, next) {
    let {input, output, source} = req.body;

    pandoc.convert(source, input, output, (err, target) => {
        console.log(err, target, "err, target");
        
        if (err) return next(err);
        return res.json({ target: target });
    });
});

module.exports = router;
