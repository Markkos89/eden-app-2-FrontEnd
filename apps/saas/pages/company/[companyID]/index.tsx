import { useQuery } from "@apollo/client";
import { FIND_COMPANY_FULL } from "@eden/package-graphql";
import { CandidateType } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  Button,
  // CandidateModal,
  CandidatesTableList,
  TrainQuestionsEdenAI,
} from "@eden/package-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../../_app";

type QuestionType = {
  _id: number;
  content: string;
  bestAnswer: string;
};

const CompanyCRM: NextPageWithLayout = () => {
  // interface MessageObject {
  //   message: string;
  //   sentMessage: boolean;
  //   user?: string;
  // }

  const router = useRouter();
  const { companyID } = router.query;

  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // const [selectedUserScore, setSelectedUserScore] = useState<number | null>(
  //   null
  // );
  // const [selectedUserSummaryQuestions, setSelectedUserSummaryQuestions] =
  //   useState<any[]>([]);
  const [trainModalOpen, setTrainModalOpen] = useState(false);

  const {
    // data: findCompanyData,
    loading: findCompanyIsLoading,
    // error: findCompanyError,
  } = useQuery(FIND_COMPANY_FULL, {
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
        // return {
        //   _id: question.question._id,
        //   content: question.question.content,
        //   bestAnswer: question.bestAnswer,
        // };
      });

      setQuestions(questionPrep);
    },
  });

  const handleRowClick = (user: CandidateType) => {
    if (!user.user) return;
    router.push(`/company/${companyID}/candidate/${user.user?._id}`);
    // if (user.user?._id) setSelectedUserId(user.user?._id);
    // if (user.overallScore) setSelectedUserScore(user.overallScore);
    // if (user.summaryQuestions)
    //   setSelectedUserSummaryQuestions(user.summaryQuestions);
  };

  const handleTrainButtonClick = () => {
    setTrainModalOpen(true);
  };

  const handleCloseTrainModal = () => {
    setTrainModalOpen(false);
  };

  const handleCopyLink = () => {
    // const url = window.location.href;
    // const url = "http://localhost:3000/test/interviewEdenAIpage/" + companyID;
    const url = `${window.location.origin}/interview/${companyID}`;

    navigator.clipboard.writeText(url);
    setNotificationOpen(true);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  };

  // const handleOnCandidateInfoModalClose = () => {
  //   setSelectedUserId(null);
  // };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Candidates
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleCopyLink}
        >
          Link Candidates Copy
        </button>
      </div>
      <CandidatesTableList
        candidatesList={candidates}
        fetchIsLoading={findCompanyIsLoading}
        setRowObjectData={handleRowClick}
      />
      <button
        className="mt-4 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
        onClick={handleTrainButtonClick}
      >
        Train EdenAI Dirty
      </button>
      <Link href={`/company/${companyID}/train`}>
        <Button
          variant="secondary"
          // onClick={() => {
          //   router.push(`/company/${companyID}/train`);
          // }}
        >
          Train AI
        </Button>
      </Link>
      {trainModalOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseTrainModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
              <TrainQuestionsEdenAI
                questions={questions}
                companyID={companyID}
                setQuestions={setQuestions}
                setTrainModalOpen={setTrainModalOpen}
              />
            </div>
          </div>
        </div>
      ) : null}
      {notificationOpen ? (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 rounded-lg bg-green-500 px-4 py-2 text-white">
          Link copied!
        </div>
      ) : null}
    </div>
  );
};

CompanyCRM.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CompanyCRM;
