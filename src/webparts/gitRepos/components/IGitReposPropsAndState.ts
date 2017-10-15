import { HttpClient } from '@microsoft/sp-http';
import { IEventAggregator } from '@microsoft/sp-webpart-base/lib';

export interface IGitReposProps {
  description: string;
  eventAggregator: IEventAggregator;
  subscriberId: string;
  httpClient: HttpClient;
}

export interface IGitReposState {
  gitId: string;
}