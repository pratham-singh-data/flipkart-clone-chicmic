const aggregateRunnerServices = require(`./aggregateRunnerService`);
const deleteByIdService = require(`./deleteByIdServices`);
const findByIdService = require(`./findByIdServices`);
const findManyService = require(`./findManyServices`);
const findOneServices = require(`./findOneServices`);
const saveDocumentServices = require(`./saveDocumentServices`);
const updateByIdServices = require(`./updateByIdServices`);

module.exports = {
    ...aggregateRunnerServices,
    ...deleteByIdService,
    ...findByIdService,
    ...findManyService,
    ...findOneServices,
    ...saveDocumentServices,
    ...updateByIdServices,
};
