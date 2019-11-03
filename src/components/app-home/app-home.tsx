import { Component, h, State } from '@stencil/core';
import { GitHubService } from '../../services/github-service';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  @State() owner: string = 'krzysio94598';
  @State() repo: string = 'awscli-node-docker';
  @State() eventType: string;

  @State() data: any;

  gitHubService = new GitHubService();

  async handleSubmit(e) {
    e.preventDefault()
    console.log(this.owner, this.repo);
    // send data to our backend

    this.data = await this.gitHubService.getEvents(this.owner, this.repo);

    console.log('data', this.data);
  }

  handleOwnerChange(event) {
    this.owner = event.target.value;
  }

  handleRepoChange(event) {
    this.repo = event.target.value;
  }

  handleTypeSelect(event) {

  }

  renderData() {
    return (
      <div>
        <h2>Results</h2>

        <label>
          Filter by Type:
          <select onInput={(event) => this.handleTypeSelect(event)}>
            <option value="PushEvent" selected={this.eventType === 'PushEvent'}>PushEvent</option>
            {/* <option value="saab" selected={this.eventType === 'saab'}>Saab</option>
            <option value="mercedes" selected={this.eventType === 'mercedes'}>Mercedes</option>
            <option value="audi" selected={this.eventType === 'audi'}>Audi</option> */}
          </select>
        </label>


        <table>
          <th>
            <tr>
              <td>id</td>
              <td>type</td>
              <td>actor</td>
              <td>timestamp</td>
            </tr>
          </th>
          <tbody>
            {this.data.map((row) =>
              <tr>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.actor.display_login}</td>
                <td>{row.created_at}</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to ...
        </p>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Owner:
          <input type="text" required value={this.owner} onInput={(event) => this.handleOwnerChange(event)} />
          </label>
          <label>
            Repo:
          <input type="text" required value={this.repo} onInput={(event) => this.handleRepoChange(event)} />
          </label>
          <button type="submit">Submit</button>
        </form>

        {/* <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link> */}

        {this.data ? this.renderData() : null}

      </div>
    );
  }
}