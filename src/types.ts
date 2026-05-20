export type NodeType = 'Institution' | 'Party' | 'Person' | 'Project' | 'Bloc';

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  val?: number; // Size/weight
  color?: string;
  description?: string;
}

export interface Link {
  source: string;
  target: string;
  label: string;
  strength?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
