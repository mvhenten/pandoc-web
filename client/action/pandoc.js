"use strict";

const agent = require("superagent");
const store = require("../store/pandoc");

module.exports.formats = function formats() {
    agent.get("/api/format", (err, res) => {
        if (err) return console.error(err);
        store.set("formats", res.body);
    });
};

module.exports.convert = function convert(formData) {
    let data = {};
    
    for(var pair of formData.entries()) {
        data[pair[0]] = pair[1];
    }    
    
    agent.post("/api/format").send(data).end((err, res) => {
        if (err) return console.error(err);
        store.set("output", res.body.target);
    });
};