import { NextApiRequest, NextApiResponse } from "next";

import DockerClient from "lib/docker/client";

import Repository from "models/repository";

const dockerRegistryApiBaseUrl = process.env.DOCKER_REGISTRY_BASE_URL;
const dockerRegistryDomain = process.env.DOCKER_REGISTRY_DOMAIN;

const dockerClient = new DockerClient(dockerRegistryApiBaseUrl);

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await dockerClient.getRepositories();

  const repos: Repository[] = result.map((repositoryName) => ({
    name: repositoryName,
    registryUrl: `${dockerRegistryDomain}/${repositoryName}`,
  }));

  res.json(repos);
};
