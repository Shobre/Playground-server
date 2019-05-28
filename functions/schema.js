const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    fuck: String
    test: Response
  }

  type Response {
    StatusCode: Int
    Message: String
    ExecutionTime: Int
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
    LineNumbers: LineNumber
    Expanded: Boolean
    Planned: Boolean
    SortIndex: Int
    TrafficLine: String
    EventInfoUrl: String
    Status: String
    StatisIcon: String
  }

  type LineNumber {
    InputDataIsOptional: Boolean
    Text: String
  }
`;

module.exports = typeDefs;
