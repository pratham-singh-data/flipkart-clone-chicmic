const { Router, } = require('express');
const { readAllPromos,
    readPromo,
    readRandomPromo,
    deletePromo,
    updatePromo,
    createPromo,
    registerPromoView,
    registerPromoClick, } = require('../controller/promoController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { createPromoSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const promoRouter = Router();

promoRouter.get(`/promo/random`, readRandomPromo);
promoRouter.get(`/promo/:id`, readPromo);
promoRouter.get(`/promos`, readAllPromos);
promoRouter.delete(`/promo/:id`, checkToken, deletePromo);

promoRouter.put(`/promo/:id`, checkToken,
    validateBody(createPromoSchema),
    updatePromo);

promoRouter.post(`/promo`, checkToken,
    validateBody(createPromoSchema),
    createPromo);

promoRouter.patch(`/promoClick/:id`, registerPromoClick);

promoRouter.patch(`/promoView/:id`, registerPromoView);

module.exports = {
    promoRouter,
};
