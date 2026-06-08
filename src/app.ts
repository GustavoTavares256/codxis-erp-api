import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import Fastify from "fastify";

import { env } from "./config/env";
import { loggerConfig } from "./config/logger";
import { errorHandler } from "./shared/errors/error-handler";
import { registerHooks } from "./shared/hooks";
import { registerMiddlewares } from "./shared/middlewares";
import { registerModules } from "./modules";

export function buildApp() {
  const app = Fastify({
    logger: loggerConfig,
  });

  app.register(cors, {
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 1,
    },
  });

  app.setErrorHandler(errorHandler);

  registerHooks(app);
  registerMiddlewares(app);
  registerModules(app);

  return app;
}

export const app = buildApp();
