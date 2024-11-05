export interface Dependency {
  name: string;
  source: "relative" | "remote";
  location: string;
}

export interface Repo {
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
  has_build_zig_zon?: number;
  has_build_zig?: number;
  fork?: boolean;
  updated_at: string;
  dependencies?: Dependency[];
  berg?: number;
  archived?: boolean;
}

export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3) return (i / 1000).toString().slice(0, 3) + "K";
  else return numberAsString;
}
