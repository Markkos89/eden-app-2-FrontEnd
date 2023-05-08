/* eslint-disable no-unused-vars */
import { useQuery } from "@apollo/client";
import { FIND_MEMBER } from "@eden/package-graphql";
import { SummaryQuestionType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  GraphTab,
  InfoTab,
  MatchTab,
  ScoresTab,
  TextHeading3,
} from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useState } from "react";

export interface ICandidateInfoProps {
  memberID: string;
  percentage: number | null;
  summaryQuestions: SummaryQuestionType[];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const CandidateInfo = ({
  memberID,
  percentage,
  summaryQuestions,
}: ICandidateInfoProps) => {
  const [index, setIndex] = useState(0);

  const { data: dataMember } = useQuery(FIND_MEMBER, {
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
      Content: () => <InfoTab member={dataMember?.findMember} />,
    },
    {
      tab: "MATCH %",
      Content: () => (
        <MatchTab
          member={dataMember?.findMember}
          summaryQuestions={summaryQuestions}
        />
      ),
    },
    {
      tab: "GRAPH",
      Content: () => <GraphTab member={dataMember?.findMember} />,
    },
    {
      tab: "EDEN AI CHAT",
      Content: () => (
        <ScoresTab
          member={dataMember?.findMember}
          percentage={percentage}
          summaryQuestions={summaryQuestions}
        />
      ),
    },
  ];

  return (
    <section>
      <div className="font-Inter mb-4 flex-col bg-white text-center">
        <div className="grid grid-cols-3 bg-white">
          <div className="col-1 mt-5 w-full p-2 text-center">
            <div className="flex w-full justify-end">
              <Button className="bg-red-400 font-bold text-white" radius="pill">
                REJECT
              </Button>
            </div>
          </div>
          <div className="col-2 p-2">
            <div className="flex w-full justify-center">
              <Avatar src={dataMember?.findMember.discordAvatar!} size={`lg`} />
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
            {dataMember?.findMember.discordName}
          </TextHeading3>
        </div>
        <TextHeading3 className="font-extrabold text-gray-500">
          {dataMember?.findMember.memberRole?.title}
        </TextHeading3>
      </div>
      <div className="w-full bg-white">
        <Tab.Group
          defaultIndex={index}
          onChange={(index: number) => {
            setIndex(index);
          }}
        >
          <Tab.List className="flex justify-between bg-white px-6 text-xl">
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
            {tabs.map(({ Content }, index) => (
              <Tab.Panel key={index}>
                <div className="relative">
                  <Content />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};
