module.exports = {
    OBJECTIDREGEX: /^[0-9a-fA-F]{24}$/,
    PHONENUMBERREGEX: /^[0-9]{10}$/,
    STRINGLENGTHMIN: 1,
    STRINGLENGTHMAX: {
        NORMAL: 1000,
        LONG: 99999,
    },
    REVIEWRATING: {
        MIN: 0,
        MAX: 10,
    },
    PROMOPRIORITY: {
        MIN: 0,
        MAX: 10,
    },
    ALLOWEDIMAGEMIMES: [ `image/png`,
        `image/jpeg`,
        `image/webp`,
        `image/gif`, ],
    TOKENTYPES: {
        LOGIN: 0,
    },
};
