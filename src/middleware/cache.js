const cache = require('memory-cache');

// Middleware to cache responses for a specific duration
function cacheMiddleware(duration) {
    return (req, res, next) => {
        const key = '__express__' + req.originalUrl || req.url;
        const cachedBody = cache.get(key);

        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                cache.put(key, body, duration * 1000); // cache for 'duration' seconds
                res.sendResponse(body);
            };
            next();
        }
    };
}

module.exports = {
    cacheMiddleware
}