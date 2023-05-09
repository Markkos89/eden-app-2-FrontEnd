/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { CandidateType, Members } from "@eden/package-graphql/generated";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type QuestionType = {
  _id: number;
  content: string;
  bestAnswer: string;
};

export interface SaasAppContextType {
  showFullCandidatesTable: boolean;
  setShowFullCandidatesTable: Dispatch<SetStateAction<boolean>>;
  trainQuestions: QuestionType[];
  setTrainQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  candidates: CandidateType[];
  findCompanyIsLoading: boolean;
  selectedCandidateID: string;
  setSelectedCandidateID: Dispatch<SetStateAction<string>>;
  selectedCandidateScore: number | null;
  setSelectedCandidateScore: Dispatch<SetStateAction<number | null>>;
  selectedCandidateSummaryQuestions: any[];
  setSelectedCandidateSummaryQuestions: Dispatch<SetStateAction<any[]>>;
  candidateInfo: Members;
}

export const SaasAppContext = createContext<SaasAppContextType>({
  showFullCandidatesTable: true,
  setShowFullCandidatesTable: () => {},
  trainQuestions: [],
  setTrainQuestions: () => {},
  candidates: [],
  findCompanyIsLoading: false,
  selectedCandidateID: "",
  setSelectedCandidateID: () => {},
  selectedCandidateScore: null,
  setSelectedCandidateScore: () => {},
  selectedCandidateSummaryQuestions: [],
  setSelectedCandidateSummaryQuestions: () => {},
  candidateInfo: {},
});

SaasAppContext.displayName = "SaasAppContext";

export const useSaasAppContext = () => useContext(SaasAppContext);
