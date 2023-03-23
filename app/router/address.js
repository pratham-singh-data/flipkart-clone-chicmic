const { Router, } = require('express');
const { registerAddress,
    updateAddress,
    readAddress,
    readAllAddresses,
    deleteAddress, } = require('../controller/addressController');
const { checkToken, validateBody, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { registerAddressSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const addressRouter = Router();

addressRouter.post(`/`, checkToken(TOKENTYPES.LOGIN),
    validateBody(registerAddressSchema),
    registerAddress);

addressRouter.put(`/:id`, checkToken(TOKENTYPES.LOGIN),
    validateBody(registerAddressSchema),
    updateAddress);

addressRouter.get(`/`, checkToken(TOKENTYPES.LOGIN), readAllAddresses);
addressRouter.get(`/:id`, checkToken(TOKENTYPES.LOGIN), readAddress);
addressRouter.delete(`/:id`, checkToken(TOKENTYPES.LOGIN), deleteAddress);

module.exports = {
    addressRouter,
};
