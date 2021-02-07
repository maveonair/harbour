import { NextApiRequest, NextApiResponse } from "next";

import DockerClient from "lib/docker/client";
import Repository from "models/repository";

const dockerRegistryApiBaseUrl = process.env.DOCKER_REGISTRY_BASE_URL;
const dockerRegistryDomain = process.env.DOCKER_REGISTRY_DOMAIN;

const dockerClient = new DockerClient(dockerRegistryApiBaseUrl);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  const tags = await dockerClient.getTags(`${name}`);

  const response: Repository = {
    name: `${name}`,
    registryUrl: `${dockerRegistryDomain}/${name}`,
    tags: tags,
  };

  res.json(response);
};
