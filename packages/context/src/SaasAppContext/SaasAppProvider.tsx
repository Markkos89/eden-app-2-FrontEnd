import React, { useState } from "react";

import { SaasAppContext, SaasAppContextType } from "./SaasAppContext";

export interface SaasAppProviderProps {
  children: React.ReactNode;
}

export const SaasAppProvider = ({ children }: SaasAppProviderProps) => {
  const [showFullCandidatesTable, setShowFullCandidatesTable] =
    useState<boolean>(true);

  const [selectedCandidateID, setSelectedCandidateID] = useState<string>("");
  const [selectedCandidateScore, setSelectedCandidateScore] =
    useState<number | null>(null);
  const [
    selectedCandidateSummaryQuestions,
    setSelectedCandidateSummaryQuestions,
  ] = useState<any[]>([]);

  const injectContext: SaasAppContextType = {
    showFullCandidatesTable,
    setShowFullCandidatesTable,
    selectedCandidateID,
    setSelectedCandidateID,
    selectedCandidateScore,
    setSelectedCandidateScore,
    selectedCandidateSummaryQuestions,
    setSelectedCandidateSummaryQuestions,
  };

  return (
    <SaasAppContext.Provider value={injectContext}>
      {children}
    </SaasAppContext.Provider>
  );
};
