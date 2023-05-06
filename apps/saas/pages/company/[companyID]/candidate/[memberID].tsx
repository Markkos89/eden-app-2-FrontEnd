import { useQuery } from "@apollo/client";
import { FIND_COMPANY_QUESTIONS, FIND_MEMBER } from "@eden/package-graphql";
import {
  QuestionType,
  SummaryQuestionType,
} from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  Avatar,
  Button,
  GraphTab,
  InfoTab,
  MatchTab,
  ScoresTab,
  TextHeading3,
} from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import { NextPageWithLayout } from "../../../_app";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const CandidatePage: NextPageWithLayout = () => {
  const [index, setIndex] = useState(0);

  const [summaryQuestions, setSummaryQuestions] = useState<
    SummaryQuestionType[]
  >([]);
  const { memberID, companyID } = useRouter().query;

  const { data: findCompanyQuestionsData } = useQuery(FIND_COMPANY_QUESTIONS, {
    variables: {
      fields: {
        _id: companyID,
      },
    },
    skip: !Boolean(companyID),
    ssr: false,
  });

  const { data: findMemberData /* , loading: findMemberIsLoading */ } =
    useQuery(FIND_MEMBER, {
      variables: {
        fields: {
          _id: memberID,
        },
      },
      skip: !Boolean(memberID),
      ssr: false,
    });

  const tabs = [
    {
      tab: "INFO",
    },
    {
      tab: "MATCH %",
    },
    {
      tab: "GRAPH",
    },
    {
      tab: "EDEN AI CHAT",
    },
  ];

  useMemo(() => {
    if (findCompanyQuestionsData) {
      const questionPrep: SummaryQuestionType[] =
        findCompanyQuestionsData.findCompany.questionsToAsk.map(
          (question: QuestionType) => {
            if (question.question) {
              return {
                _id: question.question._id,
                content: question.question.content,
                bestAnswer: question.bestAnswer,
              };
            }
          }
        );

      setSummaryQuestions(questionPrep);
    }
  }, [findCompanyQuestionsData]);

  return (
    <div>
      <div className="font-Inter mb-4 flex-col text-center">
        <div className="grid grid-cols-3">
          <div className="col-1 mt-5 w-full p-2 text-center">
            <div className="flex w-full justify-end">
              <Button className="bg-red-400 font-bold text-white" radius="pill">
                REJECT
              </Button>
            </div>
          </div>
          <div className="col-2 p-2">
            <div className="flex w-full justify-center">
              <Avatar
                src={findMemberData?.findMember.discordAvatar}
                size={`lg`}
              />
            </div>
          </div>
          <div className="col-3 mt-5 w-full p-2 text-center">
            <div className="flex w-full justify-start">
              <Button
                variant="primary"
                radius="pill"
                className="font-bold text-white"
              >
                APPROVE
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <TextHeading3 className="font-extrabold">
            {findMemberData?.findMember.discordName}
          </TextHeading3>
        </div>
        <TextHeading3 className="font-extrabold text-gray-500">
          {findMemberData?.findMember.memberRole?.title}
        </TextHeading3>
      </div>
      <div className="w-full">
        <Tab.Group
          defaultIndex={index}
          onChange={(index: number) => {
            console.log("Changed selected tab to:", index);
            setIndex(index);
          }}
        >
          <Tab.List className="flex justify-between px-6 text-xl">
            {tabs.map(({ tab }, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-b-soilGreen-700 text-soilGreen-700 w-full border-b-4 outline-none"
                      : "font-avenir-roman w-full border-b-4 text-gray-400"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {({ selectedIndex }) => {
              if (selectedIndex === 0)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <InfoTab member={findMemberData?.findMember} />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 1)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <MatchTab
                        member={findMemberData?.findMember}
                        summaryQuestions={summaryQuestions}
                      />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 2)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <GraphTab member={findMemberData?.findMember} />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 3)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <ScoresTab
                        member={findMemberData?.findMember}
                        percentage={findMemberData?.findMember.overallScore}
                        summaryQuestions={summaryQuestions}
                      />
                    </div>
                  </Tab.Panel>
                );

              return <></>;
            }}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

CandidatePage.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CandidatePage;
