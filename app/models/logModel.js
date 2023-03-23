const { Schema, model, } = require('mongoose');

const logSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const LogModel = model(`logs`, logSchema);

module.exports = {
    LogModel,
};
