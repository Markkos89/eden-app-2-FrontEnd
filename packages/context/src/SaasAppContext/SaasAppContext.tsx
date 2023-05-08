/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface SaasAppContextType {
  showFullCandidatesTable: boolean;
  setShowFullCandidatesTable: Dispatch<SetStateAction<boolean>>;
  selectedCandidateID: string;
  setSelectedCandidateID: Dispatch<SetStateAction<string>>;
  selectedCandidateScore: number | null;
  setSelectedCandidateScore: Dispatch<SetStateAction<number | null>>;
  selectedCandidateSummaryQuestions: any[];
  setSelectedCandidateSummaryQuestions: Dispatch<SetStateAction<any[]>>;
}

export const SaasAppContext = createContext<SaasAppContextType>({
  showFullCandidatesTable: true,
  setShowFullCandidatesTable: () => {},
  selectedCandidateID: "",
  setSelectedCandidateID: () => {},
  selectedCandidateScore: null,
  setSelectedCandidateScore: () => {},
  selectedCandidateSummaryQuestions: [],
  setSelectedCandidateSummaryQuestions: () => {},
});

SaasAppContext.displayName = "SaasAppContext";

export const useSaasAppContext = () => useContext(SaasAppContext);
