import { useSaasAppContext } from "@eden/package-context";
import {
  AppUserLayout,
  Button,
  CandidateInfo,
  CandidatesTableList,
  TrainQuestionsEdenAI,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../_app";

const CompanyCRM: NextPageWithLayout = () => {
  const {
    candidates,
    findCompanyIsLoading,
    trainQuestions,
    setTrainQuestions,
  } = useSaasAppContext();

  const router = useRouter();
  const { companyID } = router.query;

  const [trainModalOpen, setTrainModalOpen] = useState(false);

  const handleTrainButtonClick = () => {
    setTrainModalOpen(true);
  };

  const handleCloseTrainModal = () => {
    setTrainModalOpen(false);
  };

  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      <div className="col-1">
        <div className="container m-4 border border-gray-500 p-4">
          <CandidatesTableList
            candidatesList={candidates}
            fetchIsLoading={findCompanyIsLoading}
          />
          <button
            className="mt-4 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            onClick={handleTrainButtonClick}
          >
            Train EdenAI Dirty
          </button>
          <Button
            variant="secondary"
            onClick={() => {
              router.push(`/train-ai/${companyID}`);
            }}
          >
            Train AI
          </Button>
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
                    questions={trainQuestions}
                    companyID={companyID}
                    setQuestions={setTrainQuestions}
                    setTrainModalOpen={setTrainModalOpen}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="col-2">
        <div className="m-4 border border-gray-500 bg-white p-10">
          <CandidateInfo />
        </div>
      </div>
    </div>
  );
};

CompanyCRM.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CompanyCRM;
