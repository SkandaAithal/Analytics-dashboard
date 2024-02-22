import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://usw1-evolving-sailfish-34277.upstash.io",
  token: process.env.REDIS_KEY!,
});
