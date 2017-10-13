import * as React from 'react';
import styles from './GitRepos.module.scss';
import { IGitReposProps } from './IGitReposPropsAndState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class GitRepos extends React.Component<IGitReposProps, {}> {

  public constructor(props: IGitReposProps) {
    super(props);
    this.state = {

    };
  }

  public render(): React.ReactElement<IGitReposProps> {
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


}
