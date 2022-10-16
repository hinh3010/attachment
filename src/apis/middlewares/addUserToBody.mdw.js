export const addDataToBody = (body) => (req, res, next) => {
    console.log({ body })
    Object.keys(body).forEach((key) => {
        req.body[key] = req[body[key]];
        if (key == "deletedById") {
            req.body.deletedAt = new Date();
        }
    })
    next()
}

export const addParamToBody = (paramsKeys) => (req, res, next) => {
    paramsKeys.forEach((key) => {
        req.body[key] = req.params[key];
    })
    next()
}
