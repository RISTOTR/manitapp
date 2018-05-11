const Offer = require('../models/Offer');
const myOffers = (req, res, next) => {
    const offerId = req.params.id;
    Offer.findOne({_id: offerId})

        .then(t => {
            console.log(req.user);
            console.log(req.user._id);
            console.log(req.prof._id)
            if (req.user&&(JSON.stringify(t.user_id) === JSON.stringify(req.user._id))) {
            next();
        } else {
            res.redirect('/');
        }
    })
    .catch(err => next(err));
}
module.exports = myOffers;


