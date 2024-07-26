export default interface Repo {
  avatar_url: string;
  name: string;
  full_name: string;
  created_at: string;
  description: string;
  default_branch?: string;
  open_issues: number;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  contentIsCorrect?: boolean;
  tags_url: string;
  license: string;
  readme_content?: string;
  specials?: string;
  topics?: Array<string>;
  size: number;
  updated_at: string;
}

export const placeHolderRepoType: Repo = {
  avatar_url: "",
  size: 0,
  updated_at: "",
  name: "",
  full_name: "",
  created_at: "",
  description: "",
  open_issues: 0,
  stargazers_count: 0,
  forks_count: 0,
  watchers_count: 0,
  tags_url: "",
  license: ""
};
