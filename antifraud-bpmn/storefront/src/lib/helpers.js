function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * naive function for creating a shallow copy of an object
 * @param obj
 * @returns {*}
 */
function copy(obj) {
    return Object.assign({}, obj);
}

/**
 * get the given value from the env, raising an error if it doesn't exist (unless silent = true)
 * @param k
 * @param silent
 * @param defaultValue if the key is not set (and silent is true), then fall back to default value
 */
function getEnv(k, silent = false, defaultValue = undefined) {
    const envVal = process.env[k];

    if (envVal === undefined && !silent) {
        throw new Error(`no env var ${k} loaded`);
    }

    return envVal !== undefined ? envVal : defaultValue;
}

module.exports = { isEmpty, copy, getEnv };
