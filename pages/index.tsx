import { GetServerSideProps } from "next";
import useSWR from "swr";

import fetcher from "lib/fetcher";
import RepositoryList from "components/RepositoryList";
import Repository from "models/repository";

type HomeProps = {
  repositories: Repository[];
};

export default function Home({ repositories }: HomeProps) {
  const { data, error } = useSWR<Repository[]>("/api/repos", fetcher, {
    initialData: repositories,
  });

  return (
    <div>
      {data ? <RepositoryList repositories={data} /> : <div>Loading...</div>}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const baseUrl = process.env.BASE_URL;
  const repositories = await fetcher<Repository[]>(`${baseUrl}/api/repos`);

  return {
    props: {
      repositories,
    },
  };
}
