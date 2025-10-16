import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

export const aj =arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield protects against common attacks like SQL injection, VSS, CSRF
    shield({ mode: "LIVE"}),

    // bot detection - blocks all bots except search engines
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE"
          //list of allowed search engine bots @ https://arcjet.com/bot-list
      ]
    }),

    // token bucket algo for rate limitiing
    tokenBucket({
      mode: "LIVE",
      capacity: 100, // maximum tokens in bucket
      refillRate: 10, // tokens added per intreval
      interval: 10, // interval in seconds
    }),
  ]
})