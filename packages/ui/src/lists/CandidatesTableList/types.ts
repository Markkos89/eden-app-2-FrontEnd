import { AccesorCandidateType } from "../../../utils/useSortableTable";

export type Candidate = {
  _id: number;
  name: string;
  avatar: string;
  score: number;
  role?: string;
  background?: any[];
  level?: string;
  usdcHour?: number;
  responseRate?: number;
};

export interface Question {
  _id: string;
  content: string;
  bestAnswer: string;
}

export type ColumnsType = {
  label: string;
  accessor: AccesorCandidateType;
  sortable: boolean;
  sortbyOrder: "asc" | "desc";
};
