import * as React from 'react';
import styles from './GitRepos.module.scss';
import { IGitReposProps, IGitReposState } from './IGitReposPropsAndState';
import { escape } from '@microsoft/sp-lodash-subset';

import { EventDataSelected } from '../../../libraries/EventData/EventData';
import { IEvent } from '@microsoft/sp-webpart-base/lib';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';


export default class GitRepos extends React.Component<IGitReposProps, IGitReposState> {

  public constructor(props: IGitReposProps) {
    super(props);
    this.state = {
      gitId: ''
    };
    // subscribe for event by event name.
    // another option would be to subscribe by SourceId (IEventAggregator.subscribeBySourceId). Check the IEventAggregator definitions. 
    this.props.eventAggregator.subscribeByEventName('GitIdEvent:start', this.props.subscriberId, this._receivedEvent.bind(this));
  }

  public render(): React.ReactElement<IGitReposProps> {

    console.warn('GitRepos: render');

    return (
      <div className={styles.gitRepos}>
        <div className={styles.container}>
          <div className={"ms-Grid-row ms-bgColor-themeTertiary ms-fontColor-black ${styles.row}"}>
            <div className='ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1'>
              <span className='ms-font-xl ms-fontColor-black'>GitHub Repositories for Selected Id</span>
              <p className='ms-font-l ms-fontColor-black'>Repos Listing</p>
              <p className='ms-font-l ms-fontColor-black'>{escape(this.props.description)}</p>
            </div>
            <div
              className='ms-Grid'>
              <ul className='ms-List ms-List--grid'
                id='reposList'
                ref='repos'
              >
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentWillUpdate(): void {
    console.warn('GitRepos: componentWillUpdate');
  }

  public componentDidUpdate(): void {
    console.warn('GitRepos: componentDidUpdate');
    if (this.state.gitId) {
      console.warn('GitRepos: componentDidUpdate: ' + this.state.gitId);
      this._populateRepos();
    }
  }

  protected _receivedEvent(eventName: string, eventObject: IEvent<EventDataSelected>): void {
    console.warn('GitRepos: _receivedEvent');
    this.setState({ gitId: eventObject.data.selected });
  }

  protected _populateRepos(): void {
    var url: string = 'https://api.github.com/users/' + this.state.gitId + '/repos';
    var reposList: any = this.refs["repos"];

    reposList.innerHTML = '';

    this._getRepos(url).then(repos => {
      repos.forEach(repo => {
        reposList.innerHTML += '<div title="' + (repo.description ? repo.description : 'No Description') +
          '" class="ms-ListItem is-unread is-selectable">' +
          '<div class="ms-Grid-row ms-sm6 ms-md4 ms-lg2"><span class="ms-ListItem-primaryText">' + repo.name + '</span></div>' +
          '<div class="ms-Grid-row ms-sm2 ms-md5 ms-lg8"><span class="ms-ListItem-secondaryText">GitHub Clone Url: <br />' +
          repo.clone_url + '</span></div>' +
          '<div class="ms-Grid-row ms-sm2 ms-md5 ms-lg2 ms-fontColor-white"><span class="ms-ListItem-tertiaryText"><a href="' +
          repo.html_url + '" target="_blank">Go to GitHub Site</a></span></div>' +
          '</div><hr />';
      });
    });
  }

  private _getRepos(url: string): Promise<any> {

    return this.props.httpClient.get(url, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        return response.json();
      }).then((json) => {
        return json;
      });
  }

}
