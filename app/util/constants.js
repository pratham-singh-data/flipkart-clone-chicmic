module.exports = {
    ObjectIDRegex: /^[0-9a-fA-F]{24}$/,
    PhoneNumberRegex: /^[0-9]{10}$/,
    ImageDatabaseURL: `./database/images`,
    StringLengthMin: 1,
    StringLengthMax: {
        Normal: 1000,
        Long: 99999,
    },
    Rating: {
        Min: 0,
        Max: 10,
    },
    Priority: {
        Min: 0,
        Max: 10,
    },
    AllowedImageMimes: [ `image/png`,
        `image/jpeg`,
        `image/webp`,
        `image/gif`, ],
};
