import { IEventAggregator } from '@microsoft/sp-webpart-base/lib';

export interface IGitIdsProps {
  eventAggregator: IEventAggregator;
  description: string;
  ids: string[];
}

export interface IGitIdsState {
  selected: string;
  selectedIndex: number;
}