export interface Repo {
  content_is_correct?: boolean;
  avatar_url: string | null;
  name: string;
  full_name: string;
  created_at: string;
  description?: string | null;
  default_branch: string;
  open_issues: number;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  tags_url: string;
  license: string;
  topics?: (string)[] | null;
  size: number;
  fork: boolean;
  updated_at: string;
  has_build_zig: boolean;
  has_build_zig_zon: boolean;
  zig_minimum_version: string;
  repo_from: string;
  dependencies?: (DependenciesEntity | null)[] | null;
  readme_content: string;
  dependents?: (string | null)[] | null;
}
export interface DependenciesEntity {
  name: string;
  url: string;
  commit?: string | null;
  tar_url?: string | null;
  type: string;
}
