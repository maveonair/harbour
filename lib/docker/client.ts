import * as rm from "typed-rest-client";

import Catalog from "./catalog";
import Repository from "./repository";

export default class Client {
  private restClient: rm.RestClient;

  constructor(baseUrl: string) {
    this.restClient = new rm.RestClient("docker-registory", baseUrl);
  }

  public async getRepositories(): Promise<string[]> {
    const response = await this.restClient.get<Catalog>("/v2/_catalog");
    if (response.statusCode === 200) {
      return response.result.repositories;
    }

    return [];
  }

  public async getTags(repository: string): Promise<string[]> {
    const response = await this.restClient.get<Repository>(
      `/v2/${repository}/tags/list`
    );

    if (response.statusCode === 200) {
      return response.result.tags;
    }

    return [];
  }
}
