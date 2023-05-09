import { useQuery } from "@apollo/client";
import { FIND_COMPANY_FULL, FIND_MEMBER } from "@eden/package-graphql";
import { CandidateType, Members } from "@eden/package-graphql/generated";
import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  QuestionType,
  SaasAppContext,
  SaasAppContextType,
} from "./SaasAppContext";

export interface SaasAppProviderProps {
  children: React.ReactNode;
}

export const SaasAppProvider = ({ children }: SaasAppProviderProps) => {
  const [showFullCandidatesTable, setShowFullCandidatesTable] =
    useState<boolean>(true);
  const [trainQuestions, setTrainQuestions] = useState<QuestionType[]>([]);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);

  const [selectedCandidateID, setSelectedCandidateID] = useState<string>("");
  const [selectedCandidateScore, setSelectedCandidateScore] =
    useState<number | null>(null);
  const [
    selectedCandidateSummaryQuestions,
    setSelectedCandidateSummaryQuestions,
  ] = useState<any[]>([]);

  const [candidateInfo, setCandidateInfo] = useState<Members>({});

  const router = useRouter();
  const { companyID } = router.query;

  const { loading: findCompanyIsLoading } = useQuery(FIND_COMPANY_FULL, {
    variables: {
      fields: {
        _id: companyID,
      },
    },
    skip: !Boolean(companyID),
    ssr: false,
    onCompleted: (data: any) => {
      setCandidates(data.findCompany.candidates);
      const questionPrep: QuestionType[] = [];

      data.findCompany.questionsToAsk.map((question: any) => {
        console.log("question = ", question);
        if (question.question == null) {
        } else {
          questionPrep.push({
            _id: question.question._id,
            content: question.question.content,
            bestAnswer: question.bestAnswer,
          });
        }
      });

      setTrainQuestions(questionPrep);
    },
  });

  useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: selectedCandidateID,
      },
    },
    skip: !Boolean(selectedCandidateID),
    ssr: false,
    onCompleted: (data: any) => {
      setCandidateInfo(data.findMember);
    },
  });

  const injectContext: SaasAppContextType = {
    showFullCandidatesTable,
    setShowFullCandidatesTable,
    trainQuestions,
    setTrainQuestions,
    candidates,
    findCompanyIsLoading,
    selectedCandidateID,
    setSelectedCandidateID,
    selectedCandidateScore,
    setSelectedCandidateScore,
    selectedCandidateSummaryQuestions,
    setSelectedCandidateSummaryQuestions,
    candidateInfo,
  };

  return (
    <SaasAppContext.Provider value={injectContext}>
      {children}
    </SaasAppContext.Provider>
  );
};
