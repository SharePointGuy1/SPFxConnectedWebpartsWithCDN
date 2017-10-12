import * as React from 'react';
import * as ReactDom from 'react-dom';
import { escape } from '@microsoft/sp-lodash-subset';

import * as all from '@uifabric/styling';

import { IReactDropdownProps, IReactDropdownState } from './IReactDropdownPropsAndState';


export default class ReactDropdown extends React.Component<IReactDropdownProps, IReactDropdownState> {

    constructor(props: IReactDropdownProps) {
        super(props);
        this.state = {
            selected: '',
            selectedIdx: -1
        };
    }

    public render(): React.ReactElement<IReactDropdownProps> {
        return (
            <div>
                <div>
                    <span className='ms-Label'>
                        There are {escape(this.props.items.length.toString())} items in the array
                    </span>
                    <div className='ms-label'>
                        Please select one
                    </div>
                </div>
                <div className='ms-Dropdown' >
                    <label className='ms-Label'>{this.props.title}</label>
                    <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i>
                    <select
                        id='gitIdsDdl'
                        className='ms-Dropdown-select'
                        onChange={this._selectedChanged.bind(this)}
                        ref='ddl'
                    >
                        {this._renderGitIds()}
                    </select>
                </div>
            </div >
        );
    }

    public componentDidMount(): void {
        console.warn('ReactDropdown: componentDidMount: ' + this.state.selected);
        ReactDom.findDOMNode<HTMLSelectElement>(this.refs['ddl']).selectedIndex = -1;
    }

    public componentDidUpdate(): void {
        console.warn('ReactDropdown: componentDidUpdate: ' + this.state.selected);
    }

    public componentWillUpdate(): void {
        console.warn('ReactDropdown: componentWillUpdate ' + this.state.selected);
    }

    private _renderGitIds(): any[] {
        var gitIds: any[] = [];
        // gitIds.push(React.createElement('option', { key: -1 }, 'Select a repository'));
        for (var i: number = 0; i < this.props.items.length; i++) {
            var gitId: string = this.props.items[i].trim();
            var newOption: any = React.createElement('option',
                {
                    key: i,
                    value: gitId,
                    className: '.ms-Dropdown',
                    label: gitId
                },
                gitId);
            gitIds.push(newOption);
            //   ('<option onClick={this.select.bind(null, gitId)}>
            //     < span style= {{ color: item.hex }}>{ gitId }</span >
            // </option > ');
        }
        return gitIds;
    }

    private _selectedChanged(e: any): void {
        console.warn('ReactDropdown: Event handler handling the event from dropdown');
        this.props.onSelectedChanged(e.target.value, e.target.selectedIndex);
    }
}