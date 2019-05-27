const admin = require("firebase-admin");
const rp = require("request-promise");
const { request } = require("graphql-request");
// require all dependencies to set up server
const express = require("express");
admin.initializeApp();
const { ApolloServer, gql } = require("apollo-server-express");
// cors allows our server to accept requests from different origins
const cors = require("cors");

const fetch = require("node-fetch");
const key = "e4a3634b747345528afea507ad02678c";
const baseURL = `http://api.sl.se/api2/trafficsituation.json?key=${key}`;

function configureServer() {
  // invoke express to create our server
  const app = express();
  //use the cors middleware
  app.use(cors());

  // Simple graphql schema
  const typeDefs = gql`
    type Query {
      hello: String
      fuck: String
      Response: Response
    }

    type Response {
      StatusCode: Int
      Message: String
      ExecutionTime: String
      ResponseData: ResponseData
    }

    type ResponseData {
      TrafficTypes: [TrafficType]
    }

    type TrafficType {
      Id: ID
      Name: String
      Type: String
      TrafficStatus: Boolean
      StatusIcon: String
      Events: [Event]
      Expanded: Boolean
      HasPlannedEvent: Boolean
    }

    type Event {
      EventId: ID
      Message: String
      LineNumbers: LineNumbers
      Expanded: Boolean
      Planned: Boolean
      SortIndex: Int
      TrafficLine: String
      EventInfoUrl: String
      Status: String
      StatisIcon: String
    }

    type LineNumbers {
      InputDataIsOptional: Boolean
      Text: String
    }
  `;
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
      Response: async _ => {
        request(baseURL, query, "response")
          .then(data => {
            console.log(data);
            return data;
          })
          .catch(error => console.log(error));
      }
    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
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
