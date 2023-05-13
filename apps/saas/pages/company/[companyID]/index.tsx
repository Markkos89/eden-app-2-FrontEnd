import { useQuery } from "@apollo/client";
import {
  FIND_COMPANY_FULL,
  MATCH_NODES_MEMBERS_AI4,
} from "@eden/package-graphql";
import { CandidateType } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  Button,
  CandidateInfo,
  CandidatesTableList,
  GridItemSix,
  GridLayout,
  TrainQuestionsEdenAI,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../../_app";

type Question = {
  _id: string;
  content: string;
  bestAnswer: string;
};

interface CandidateTypeSkillMatch extends CandidateType {
  skillMatch: number;
}

const CompanyDashboardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { companyID } = router.query;

  const [candidates, setCandidates] = useState<CandidateTypeSkillMatch[]>([]);

  const [nodeIDsCompany, setNodeIDsCompany] = useState<string[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserScore, setSelectedUserScore] = useState<number | null>(
    null
  );
  const [selectedUserSummaryQuestions, setSelectedUserSummaryQuestions] =
    useState<any[]>([]);

  const [questions, setQuestions] = useState<Question[]>([]);

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
      const questionPrep: Question[] = [];

      data.findCompany.questionsToAsk.map((question: any) => {
        if (question.question == null) {
        } else {
          questionPrep.push({
            _id: question.question._id,
            content: question.question.content,
            bestAnswer: question.bestAnswer,
          });
        }
      });

      const nodesID = data.findCompany?.nodes?.map((node: any) => {
        return node?.nodeData?._id;
      });

      setNodeIDsCompany(nodesID);

      setQuestions(questionPrep);
    },
  });

  const handleRowClick = (user: CandidateType) => {
    if (user.user?._id) setSelectedUserId(user.user?._id);
    if (user.overallScore) setSelectedUserScore(user.overallScore);
    if (user.summaryQuestions)
      setSelectedUserSummaryQuestions(user.summaryQuestions);
  };

  const {} = useQuery(MATCH_NODES_MEMBERS_AI4, {
    variables: {
      fields: {
        nodesID: nodeIDsCompany,
        membersIDallow: candidates?.map((userData: any) => {
          return userData?.user?._id;
        }),
        weightModules: [
          { type: "node_Skill", weight: 70 },
          { type: "node_Category", weight: 20 },
          { type: "node_Group", weight: 5 },
          { type: "node_total", weight: 50 },
          { type: "budget_total", weight: 80 },
          { type: "availability_total", weight: 85 },
          { type: "experience_total", weight: 85 },
          { type: "everythingElse_total", weight: 50 },
        ],
      },
    },
    skip: candidates.length == 0 || nodeIDsCompany.length == 0,

    onCompleted: (data) => {
      console.log("data = ", data);

      // from data.matchNodesToMembers_AI4 change it to an object with member._id as the key

      const memberScoreObj: { [key: string]: number } = {};

      data.matchNodesToMembers_AI4.forEach((memberT: any) => {
        const keyN = memberT?.member?._id;

        if (memberScoreObj[keyN] == undefined) {
          memberScoreObj[keyN] = memberT?.matchPercentage?.totalPercentage;
        }
      });

      console.log("memberScoreObj = ", memberScoreObj);

      const candidatesNew: CandidateTypeSkillMatch[] = [];

      for (let i = 0; i < candidates.length; i++) {
        const userID = candidates[i]?.user?._id;

        if (userID && memberScoreObj[userID]) {
          console.log(
            "userID = ",
            userID,
            memberScoreObj[userID],
            candidates[i]
          );
          candidatesNew.push({
            ...candidates[i],
            skillMatch: memberScoreObj[userID],
          });
          // candidates[i].skillMatch = 3; // memberScoreObj[userID],
        }
      }

      console.log("candidatesNew = 202", candidatesNew);

      setCandidates(candidatesNew);

      // setDataMembersA(data.matchNodesToMembers_AI4);
    },
  });

  const handleTrainButtonClick = () => {
    setTrainModalOpen(true);
  };

  const handleCloseTrainModal = () => {
    setTrainModalOpen(false);
  };

  return (
    <GridLayout className="">
      <GridItemSix>
        <div className="">
          <Button
            className="mb-4 ml-auto"
            variant="secondary"
            onClick={handleTrainButtonClick}
          >
            Train EdenAI AI
          </Button>
          {/* <Button
            variant="secondary"
            onClick={() => {
              router.push(`/train-ai/${companyID}`);
            }}
          >
            Train AI
          </Button> */}
          <CandidatesTableList
            candidatesList={candidates}
            fetchIsLoading={findCompanyIsLoading}
            setRowObjectData={handleRowClick}
          />
          {trainModalOpen ? (
            <div className="fixed inset-0 z-30 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center px-4">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                  onClick={handleCloseTrainModal}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-xl">
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
        </div>
      </GridItemSix>
      <GridItemSix className="relative">
        <div className="scrollbar-hide my-4 ml-1 h-[calc(100vh-4rem)] w-[calc(100%+1rem)] overflow-y-scroll bg-white shadow-md">
          {selectedUserId ? (
            <CandidateInfo
              memberID={selectedUserId || ""}
              percentage={selectedUserScore}
              summaryQuestions={selectedUserSummaryQuestions}
            />
          ) : (
            <div className="w-full pt-20 text-center">
              <p className="text-gray-400">Select a candidate</p>
            </div>
          )}
        </div>
      </GridItemSix>
    </GridLayout>
  );
};

CompanyDashboardPage.getLayout = (page: any) => (
  <AppUserLayout>{page}</AppUserLayout>
);

export default CompanyDashboardPage;
