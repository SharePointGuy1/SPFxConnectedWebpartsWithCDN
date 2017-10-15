import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './GitIds.module.scss';
import { IGitIdsProps, IGitIdsState } from './IGitIdsPropsAndState';
import { escape } from '@microsoft/sp-lodash-subset';

import ReactDropdown from './ReactDropdown';
import { IReactDropdownProps, IReactDropdownState } from './IReactDropdownPropsAndState';
import * as uifabric from '@uifabric/styling';

import { EventDataSelected } from '../../../libraries/EventData/EventData';
import { IEvent } from '@microsoft/sp-webpart-base/lib';


export default class GitIds extends React.Component<IGitIdsProps, IGitIdsState> {

  constructor(props: IGitIdsProps) {
    super(props);
    this.state = {
      selected: '',
      selectedIndex: -1
    };
  }

  public render(): React.ReactElement<IGitIdsProps> {

    return (
      <div className={styles.gitIds}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className='ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>GitHub Repos for Selected Id!</span>
              <p className='ms-font-l ms-fontColor-white'>GitHub Ids from which to choose</p>
              <p className='ms-font-l ms-fontColor-white'>{escape(this.props.description)}</p>
              <div id='ddl' >
                <ReactDropdown
                  title={'Git Ids'}
                  description={this.props.description}
                  items={this.props.ids}
                  onSelectedChanged={this.onSelectedChanged.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    console.warn('GitIdsLister: componentDidMount');
  }

  public componentWillUpdate(): void {
    console.warn('GitIdsLister: componentWillUpdate');
  }

  public componentDidUpdate(): void {
    console.warn('GitIdsLister: componentDidUpdate');
    this._broadcastData();
  }

  public onSelectedChanged(selectedText: string, selectedIdx: number): void {
    console.warn('Event handler handling the event for the dropdown');

    this.setState({
      selected: selectedText,
      selectedIndex: selectedIdx
    });
  }

  protected _broadcastData(): void {
    this.props.eventAggregator.raiseEvent(
      'GitIdEvent:start', {
        data: {
          selected: this.state.selected,
          selectedIndex: this.state.selectedIndex
        },
        sourceId: 'GitIdWebPart',
        targetId: 'GitRepos'
      } as IEvent<EventDataSelected>
    );
  }

}
