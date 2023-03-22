const { Router, } = require('express');
const { registerAddress,
    updateAddress,
    readAddress,
    readAllAddresses,
    deleteAddress, } = require('../controller/addressController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { registerAddressSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const addressRouter = Router();

addressRouter.post(`/`, checkToken,
    validateBody(registerAddressSchema),
    registerAddress);

addressRouter.put(`/:id`, checkToken,
    validateBody(registerAddressSchema),
    updateAddress);

addressRouter.get(`/`, checkToken, readAllAddresses);
addressRouter.get(`/:id`, checkToken, readAddress);
addressRouter.delete(`/:id`, checkToken, deleteAddress);

module.exports = {
    addressRouter,
};