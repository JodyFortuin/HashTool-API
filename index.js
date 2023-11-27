const express = require("express");

var viewEngine = require('view-engine');
viewEngine.register('marko', require('view-engine-marko'));
var template = require('view-engine').load('views/template.marko');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/hashtool_db';
const pool = new Pool({
    connectionString
});

const HashToolService = require("./hashtool");
const hashtool = HashToolService(pool);

let app = express();

app.get("/", async function (req, res) {
    template.render({
    }, res)
});

const axios = require("axios");

app.get("/search/:hashtag", async function (req, res) {
    var searchInput = req.params.hashtag;
    let response = {};
    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag',
        params: {hashtag: searchInput},
        headers: {
        'X-RapidAPI-Key': '216f9fd1d1msha2aacb301f5ad32p1a965cjsnc42ca3d6bb74',
        'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com',
        }
    };
    try {
        response = await axios.request(options);
    } catch (error) {
        console.error(error);
    }

    const displayPosts = await hashtool.getPosts(response);
    template.render({
        results: "Results: " + JSON.stringify(displayPosts.data, null, 4)
    }, res)
});

let PORT = process.env.PORT || 4024;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});