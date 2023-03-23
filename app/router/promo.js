const { Router, } = require('express');
const { readAllPromos,
    readPromo,
    readRandomPromo,
    deletePromo,
    updatePromo,
    createPromo,
    registerPromoView,
    registerPromoClick, } = require('../controller/promoController');
const { checkToken, validateBody, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { createPromoSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const promoRouter = Router();

promoRouter.get(`/random`, readRandomPromo);
promoRouter.get(`/:id`, readPromo);
promoRouter.get(`/`, readAllPromos);
promoRouter.delete(`/:id`, checkToken(TOKENTYPES.LOGIN), deletePromo);

promoRouter.put(`/:id`, checkToken(TOKENTYPES.LOGIN),
    validateBody(createPromoSchema),
    updatePromo);

promoRouter.post(`/`, checkToken(TOKENTYPES.LOGIN),
    validateBody(createPromoSchema),
    createPromo);

promoRouter.patch(`/click/:id`, registerPromoClick);

promoRouter.patch(`/view/:id`, registerPromoView);

module.exports = {
    promoRouter,
};
