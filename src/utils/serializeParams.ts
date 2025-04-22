const serializeParams = (params) => {
    const result = {};
    for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
            result[`${key}[]`] = value;
        } else if (typeof value === 'object' && value !== null) {
            for (const subKey in value) {
                result[`${key}[${subKey}]`] = value[subKey];
            }
        } else {
            result[key] = value;
        }
    }
    return result;
};
export default serializeParams;
