export default interface Repo {
    name: string;
    full_name: string;
    created_at: string;
    description: string;
    default_branch?:string;
    open_issues: string;
    stargazers_count: string;
    forks_count: string;
    watchers_count: string;
    contentIsCorrect?: boolean;
    tags_url?: string;
    owner: { avatar_url: string };
    readme_content?: string;
    specials?: string;
}
