module.exports = function(request, response, next) {

    if (request.session.middle) {
        response.locals.middle = request.session.middle
        request.session.middle = undefined
    }

    request.middle = function(type, contact) {
        if (request.session.middle === undefined) {
            request.session.middle = {}
        }
        request.session.middle[type] = contact
    }
    next();
}