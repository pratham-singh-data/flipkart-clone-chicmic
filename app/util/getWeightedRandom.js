/** Returns a weighted random element from the given array
 * @param {Array} arr Array from which element is to be selected;
 * elements should be [val, priority]
 * @return {String} A 24 length hexadecimal string
 */
function getWeightedRandom(arr) {
    // console.log(arr);
    if (arr.length === 0) {
        return `000000000000000000000000`;
    }

    let totalPriority = 0;
    // calculate total weight
    for (const iter of arr) {
        totalPriority += iter[1];
    }

    // generate a random number between 0 and totalPriority
    const random = Math.random() * totalPriority;

    // choose
    let upto = 0;
    for (const [ val, priority, ] of arr) {
        if (upto + priority >= random) {
            return val;
        }

        upto += priority;
    }

    // should never get here
    return `000000000000000000000000`;
}

module.exports = {
    getWeightedRandom,
};
