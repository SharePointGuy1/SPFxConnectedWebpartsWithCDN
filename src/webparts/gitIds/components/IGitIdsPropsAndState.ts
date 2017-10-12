export interface IGitIdsProps {
  description: string;
  ids: string[];
}

export interface IGitIdsState {
  selected: string;
  selectedIndex: number;
}