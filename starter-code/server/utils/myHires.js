const Hire = require('../models/Hire');

const myHires = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.user.id)
    const offerId = req.params.id;
    Hire.findById(req.params.id)

        .then(t => {
            if (req.user.id == t.user) {
            next();
        } else {
            res.redirect('/');
        }
    })
    .catch(err => next(err));
}
module.exports = myHires;
