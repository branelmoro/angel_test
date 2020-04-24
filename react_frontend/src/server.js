import express from "express";
import cors from "cors";
import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from './components/App';
import getStore from "./store";
import stateInitiator from "./stateInitiator";

global.fetch = require("node-fetch");
global.alert = function () {
    console.log(arguments);
};

const app = express();

// use cookie-parser to parser cookies
app.use(require('cookie-parser')());

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("build"));

var renderPage = (res, markup, store) => {
    console.log("markup------", markup);
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script>window.__STORE_DATA__ = ${JSON.stringify(store.getState())}</script>
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${markup}</div>
      </body>
    </html>
  `);
};

app.get("*", (req, res, next) => {
    stateInitiator(req)
        .then((initialState) => {
            console.log("initialState state is---", initialState);
            res.cookie('sessionId', initialState.session.sessionId, { maxAge: 90000000 });

            const store = getStore(initialState);
            const context = {};
            const markup = renderToString(
                <StaticRouter location={req.url} context={context}>
                    <App store={store}/>
                </StaticRouter>
            );
            renderPage(res, markup, store);
        })
        .catch((err) => {
            // return 500 error
            console.log("500 error is-------", err);
            res.status(500).send("Oops... Something went wrong!!");
        });
});

app.listen(8080, () => {
    console.log(`Server is listening on port: 8080`);
});
