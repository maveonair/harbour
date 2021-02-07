import * as React from "react";

import Link from "next/link";

import styles from "./RepositoryList.module.css";
import Repository from "models/repository";

type RepositoryListProps = {
  repositories: Repository[];
};

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const [query, setQuery] = React.useState("");
  const [filteredRepositories, setFilteredRepositories] = React.useState<
    Repository[]
  >(repositories);

  React.useEffect(() => {
    const result = filterByQuery(repositories, query);

    setFilteredRepositories(result);
  }, [repositories, query]);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filterByQuery = (
    repositories: Repository[],
    query: string
  ): Repository[] => {
    return repositories.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const copyToClipboard = (registryUrl: string) => {
    const text = pullCommand(registryUrl);
    navigator.clipboard.writeText(text);
  };

  const pullCommand = (registryUrl: string): string => {
    return `docker pull ${registryUrl}`;
  };

  return (
    <div>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search repository"
        value={query}
        onChange={onQueryChange}
      />

      <table>
        <thead>
          <tr>
            <th>Repository Name</th>
            <th className={styles.textRight}>Pull Command</th>
          </tr>
        </thead>

        <tbody>
          {filteredRepositories.map((repo: Repository, index: number) => (
            <tr key={index}>
              <td>
                <Link href={`/repos/${repo.name}`}>
                  <a>{repo.name}</a>
                </Link>
              </td>

              <td className={styles.textRight}>
                <code>{pullCommand(repo.registryUrl)}</code>

                <span onClick={() => copyToClipboard(repo.registryUrl)}>
                  <svg
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M2 4C2 2.89543 2.89543 2 4 2H14C15.1046 2 16 2.89543 16 4V8H20C21.1046 8 22 8.89543 22 10V20C22 21.1046 21.1046 22 20 22H10C8.89543 22 8 21.1046 8 20V16H4C2.89543 16 2 15.1046 2 14V4ZM10 16V20H20V10H16V14C16 15.1046 15.1046 16 14 16H10ZM14 14V4L4 4V14H14Z"
                    ></path>
                  </svg>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
