const Offer = require('../models/Offer');

const myOffers = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.user.id)
    const offerId = req.params.id;
    Offer.findById(req.params.id)

        .then(t => {
            if (req.user.id == t.prof) {
            next();
        } else {
            res.redirect('/');
        }
    })
    .catch(err => next(err));
}
module.exports = myOffers;


