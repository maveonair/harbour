import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import useSWR from "swr";

import fetcher from "lib/fetcher";
import Repository from "models/repository";
import RepositoryDetail from "components/RepositoryDetail";

type ShowRepoProps = {
  repository: Repository;
};

export default function ShowRepo({ repository }: ShowRepoProps) {
  const router = useRouter();
  const { name } = router.query;

  const { data } = useSWR<Repository>(`/api/repos/${name}`, fetcher, {
    initialData: repository,
  });

  return data ? <RepositoryDetail repository={data} /> : <div>Loading...</div>;
}

export async function getServerSideProps(context: GetServerSideProps) {
  const { name } = context["params"];

  const baseUrl = process.env.BASE_URL;
  const repository = await fetcher<Repository>(`${baseUrl}/api/repos/${name}`);

  return {
    props: {
      repository,
    },
  };
}
