const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '40f85ddee40c4cc287ae51a1f8b9a8bb'});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))

}

const handleImage = (req, res, db)=> {
    const {id} = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('user not found'))
}

module.exports = {
    handleImage,
    handleApiCall
}