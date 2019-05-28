const { RESTDataSource } = require("apollo-datasource-rest");

class SLAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://api.sl.se/api2/trafficsituation.json?key=e4a3634b747345528afea507ad02678c`;
  }

  async getAllData() {
    const response = await this.get("response");
    return Array.isArray(response)
      ? response.map(response => this.responseReducer(response))
      : [];
  }

  responseReducer(response) {
    console.log(response);
    return {
      StatusCode: response.StatusCode
    };
  }
}

module.exports = SLAPI;

// https://www.apollographql.com/docs/tutorial/schema
