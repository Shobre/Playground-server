const admin = require("firebase-admin");
const rp = require("request-promise");
const { request } = require("graphql-request");
// require all dependencies to set up server
const express = require("express");
admin.initializeApp();
const { ApolloServer } = require("apollo-server-express");
// cors allows our server to accept requests from different origins
const cors = require("cors");
const SLAPI = require("./SLAPI");
const fetch = require("node-fetch");
const typeDefs = require("./schema");
const key = "e4a3634b747345528afea507ad02678c";
const baseURL = `http://api.sl.se/api2/trafficsituation.json?key=${key}`;

function configureServer() {
  // invoke express to create our server
  const app = express();
  //use the cors middleware
  app.use(cors());

  // Simple graphql schema
  const query = `{
    Response{
      StatusCode
    }
  }`;
  // Very simple resolver that returns "world" for the hello query
  const resolvers = {
    Query: {
      hello: () => "world",
      fuck: () => "you",
      test: (_, __, { dataSources }) => {
        dataSources.SLAPI.getData();
      }
    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      slAPI: new SLAPI()
    })
  });

  function getData() {
    return rp({
      uri: baseURL
    });
  }
  // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
  server.applyMiddleware({ app });
  // finally return the application
  return app;
}
// https://www.trafiklab.se/user/14278/keys
// http://localhost:5001/playground-server/us-central1/api/graphql
// https://us-central1-playground-server.cloudfunctions.net/api/graphql?query={hello}
// https://www.youtube.com/watch?v=RDQyAcvmbpM
// https://github.com/request/request-promise
module.exports = configureServer;
