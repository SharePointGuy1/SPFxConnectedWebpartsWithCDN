import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GitIdsWebPartStrings';
import GitIds from './components/GitIds';
import { IGitIdsProps } from './components/IGitIdsPropsAndState';

export interface IGitIdsWebPartProps {
  description: string;
  ids: string;
}

export default class GitIdsWebPart extends BaseClientSideWebPart<IGitIdsWebPartProps> {


  public render(): void {

    let idsArr: string[] = this.properties.ids.split(',');

    const element: React.ReactElement<IGitIdsProps> = React.createElement(
      GitIds,
      {
        description: this.properties.description,
        ids: idsArr,
        eventAggregator: this.context.eventAggregator
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                }),
                PropertyPaneTextField('ids', {
                  label: strings.IdsFieldLabel,
                  description: strings.IdsFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
