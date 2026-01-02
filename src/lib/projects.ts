export interface Project {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  stars?: number;
  topics?: string[];
}

export const GITHUB_USERNAME = "Tyler-Bezuka";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repos");
    }

    const repos = await response.json();

    return repos
      .filter((repo: { fork: boolean }) => !repo.fork)
      .map(
        (repo: {
          name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          language: string | null;
          stargazers_count: number;
          topics: string[];
        }) => ({
          name: repo.name,
          description: repo.description || "No description available",
          url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          topics: repo.topics || [],
        })
      );
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
