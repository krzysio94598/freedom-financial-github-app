export class GitHubService {

    public async getEvents(owner: string, repo: string) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/events`);
        return await response.json();
    }
}