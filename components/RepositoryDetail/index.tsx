import Repository from "models/repository";

import styles from "./RepositoryDetail.module.css";

type RepositoryProps = {
  repository: Repository;
};

export default function RepositoryDetail({ repository }: RepositoryProps) {
  return (
    <div>
      <div className={styles.headline}>{repository.registryUrl}</div>

      <table>
        <thead>
          <tr>
            <th>Tag Name</th>
          </tr>
        </thead>
        <tbody>
          {repository.tags?.map((tag: string, index: number) => (
            <tr key={index}>
              <td>{tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
