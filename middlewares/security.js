const setRateLimit = require("express-rate-limit");

// Rate limit middleware
exports.rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 100,  // 10 requests per minute
    message: "You have exceeded your 10 requests per minute limit.",
    headers: true,
});

// Middleware for role-checking (unchanged)
exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.session.role && req.session.role === role) {
            return next();
        }
        res.status(403).send("Adgang nægtet: Du har ikke tilladelse.");
    };
};
