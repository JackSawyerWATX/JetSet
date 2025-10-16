import { aj } from "../config/arcjet.js"

// Arcjet middleware for rate limiting, bot protection, and security

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // each request consumes a token
    });

    // handles denied requests
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later"
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access detected",
          message: "Automated requests are not allowed"
        });
      } else {
        return res.status(403).json({
          error: "Access denied",
          message: "You are not allowed to access this resource"
        });
      }
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoffed())) {
      return res.status(403).json({
        error: "Bot spoofing detected!",
        message: "Your request appears to be from a malicious bot."
      });
    }
    next();

  } catch (error) {
    console.error("Arcjet middleware error:", error);
    // allow request to proceed even if Arcjet fails
    next();
  }
};