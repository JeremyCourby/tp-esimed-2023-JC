const express = require('express');
const { DateTime } = require('luxon');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initStacticMiddlwares = (app) => {
    app.use(express.static('public'));
}

const initCorsMiddlwares = (app) => {
    app.use(cors())
}

const initLoggerMiddlware = (app) => {
  app.use((req, res, next) => {
    const begin = new DateTime(new Date());

    res.on('finish', () => {
      const requestDate = begin.toString();
      const remoteIP = `IP: ${req.connection.remoteAddress}`;
      const httpInfo = `${req.method} ${req.baseUrl || req.path}`;

      const end = new DateTime(new Date());
      const requestDurationMs = end.diff(begin).toMillis();
      const requestDuration = `Duration: ${requestDurationMs}ms`;

      console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
    })
    next();
  });
};

const initjwtMiddlwares = (app) => {
  app.use(
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    }).unless({ path: [{url: "/users", methods: ["POST"]},"/auth/login"] })
  );
}


exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initLoggerMiddlware(app);
  initStacticMiddlwares(app);
  initCorsMiddlwares(app);
  initjwtMiddlwares(app);
}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });
}