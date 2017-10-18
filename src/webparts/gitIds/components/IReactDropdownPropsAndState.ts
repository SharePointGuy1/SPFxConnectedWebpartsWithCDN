export interface IReactDropdownProps {
  title: string;
  description: string;
  items: string[];
  onSelectedChanged(selectedText: string, selectedIdx: number): Function;
}

export interface IReactDropdownState {
  selected: string;
  selectedIdx: number;
}