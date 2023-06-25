const pgClient = require("../model/connect");

exports.create = (req, res) => {
    if (!req.body)
    res.status(400).send({
        message : "Ошибка"
    });
};

const client = new pgClient({
    text: req.body.txt,
})

pgClient.create(client, (err, data) => {
    if (err)
        res.status(500).send({
            message: err.message || 'Ошибка во время выполнения кода'
        })
})