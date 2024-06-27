import fs from "fs";
import Repo from "../../../types/custom_types";

async function main() {
    const urls = [
        "https://api.github.com/search/repositories?q=topic:zig-package&page=1&per_page=100",
        "https://api.github.com/search/repositories?q=topic:zig-package&page=2&per_page=100",
        "https://api.github.com/search/repositories?q=topic:zig-package&page=3&per_page=100",
        "https://api.github.com/search/repositories?q=topic:zig-package&page=4&per_page=100"
    ];

    const transformRepo = (repo: Repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        created_at: repo.created_at,
        description: repo.description,
        tags_url: repo.tags_url,
        owner: { avatar_url: repo.owner.avatar_url },
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues: repo.open_issues
    });

    function fetchAndTransform(url: string) {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
                return response.json();
            })
            .then(data => data.items.map(transformRepo));
    }

    try {
        const results = await Promise.all(urls.map(fetchAndTransform));
        const finalFileData = results.flat();

        // console.log(finalFileData);

        fs.writeFile("../../../database/main.json", JSON.stringify(finalFileData, null, 2), err => {
            if (err) throw err;
            console.log('Saved!');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

main();