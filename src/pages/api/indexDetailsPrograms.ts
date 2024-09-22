// netlify/functions/indexDetailsPrograms.js
import databaseMain from '../../../database/main.json';

export async function GET(event: { queryStringParameters: { section: string; range: string; }; }) {
  {
    const { section, range } = event.queryStringParameters;

    if (
      !section ||
      typeof section !== "string" ||
      !range ||
      typeof range !== "string"
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify([])
      };
    }

    const ranger = range.split("..");
    const ll = parseInt(ranger[0]);
    const ul = parseInt(ranger[1]);

    if (section == "mostUsed") {
      return {
        statusCode: 400,
        body: JSON.stringify(
          databaseMain
            .slice()
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(ll, ul)
        )
      };
    } else if (section == "latestRepos") {
      const sortedRepos = databaseMain
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      return {
        statusCode: 400,
        body: JSON.stringify(sortedRepos.slice(ll, ul))
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify([])
    };
  }
}