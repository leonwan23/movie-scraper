import express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        status: "success",
        message: "Movie Scraper API",
        data: { "version_number": "v1.0.0" }
    });
});

module.exports = api => {
    api.use('/v1', router);
}