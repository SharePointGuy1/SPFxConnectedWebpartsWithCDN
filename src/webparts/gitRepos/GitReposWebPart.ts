import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GitReposWebPartStrings';
import GitRepos from './components/GitRepos';
import { IGitReposProps, IGitReposState } from './components/IGitReposPropsAndState';

export interface IGitReposWebPartProps {
  description: string;
}

export default class GitReposWebPart extends BaseClientSideWebPart<IGitReposWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGitReposProps> = React.createElement(
      GitRepos,
      {
        description: this.properties.description,
        httpClient: this.context.httpClient,
        eventAggregator: this.context.eventAggregator,
        subscriberId: this.context.instanceId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
