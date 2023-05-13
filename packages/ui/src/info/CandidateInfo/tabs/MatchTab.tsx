import { Members, SummaryQuestionType } from "@eden/package-graphql/generated";
import {
  BackgroundMatchChart,
  Card,
  PopoverScoreReason,
  TextHeading2,
  TextInputLabel,
  TextLabel1,
} from "@eden/package-ui";
import { FC, useEffect, useState } from "react";

type Props = {
  member?: Members;
  summaryQuestions?: SummaryQuestionType[];
};

type BarChartQuestions = {
  questionID: string;
  questionContent: string;
  userPercentage: number;
  averagePercentage: number;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const MatchTab: FC<Props> = ({ member, summaryQuestions }) => {
  // console.log("summaryQuestions = 22", summaryQuestions);

  const [dataBarChart, setDataBarChart] = useState<BarChartQuestions[]>([]);

  const [summaryQuestionSelected, setSummaryQuestionSelected] =
    useState<SummaryQuestionType>();

  useEffect(() => {
    const dataBarChartPr: BarChartQuestions[] = [];

    summaryQuestions?.forEach((question: any) => {
      if (question?.score) {
        dataBarChartPr.push({
          questionID: question?.questionID,
          questionContent: question?.questionContentSmall,
          userPercentage: question?.score * 10,
          averagePercentage: 50, // change later to the average of users
        });
      }
    });

    setDataBarChart(dataBarChartPr);
  }, [summaryQuestions]);

  return (
    <div className="relative pt-4">
      <div className="mb-8 grid grid-cols-4">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <p className="mb-2 text-center">
            <TextLabel1>Background match</TextLabel1>
          </p>
          {/* <BackgroundMatchChart
            memberName={member?.discordName ?? ""}
            backgroundMatchData={exampleData}
          /> */}
          {dataBarChart.length > 0 && (
            <BackgroundMatchChart
              memberName={member?.discordName ?? ""}
              backgroundMatchData={dataBarChart}
            />
          )}
        </div>
        <div className="col-span-1"></div>
      </div>
      <p className="mb-2 text-center">
        <TextLabel1>Expertise</TextLabel1>
      </p>
      <div
        className={`mx-auto mb-2 grid grid-cols-3 gap-4`}
        // className={`mx-auto grid grid-cols-${
        //   summaryQuestions?.length === 1 ? 3 : summaryQuestions?.length
        // } gap-4`}
      >
        {summaryQuestions
          ? summaryQuestions.map((item, index) => (
              <div
                key={index}
                className="z-20 h-full cursor-pointer rounded-md border shadow-sm transition ease-in-out hover:scale-[1.02] hover:bg-lime-50 hover:shadow-lime-200"
                onClick={() => setSummaryQuestionSelected(item)}
              >
                <PopoverScoreReason question={item}>
                  <div className="px-4 pb-4 pt-2">
                    <div className="mx-auto mb-2 flex h-10 items-center justify-center">
                      <p className="text-center">
                        <TextLabel1 className="text-black">
                          {item.questionContentSmall?.replace(".", "")}
                        </TextLabel1>
                      </p>
                    </div>
                    <div className="">
                      <div className="flex h-full items-center justify-center">
                        <TextInputLabel className="mr-auto text-xs text-black">
                          {item.answerContentSmall?.replace(".", "")}
                        </TextInputLabel>
                        {item.score ? (
                          <div className="ml-1 font-black">
                            <TextHeading2
                              className={`${
                                index % 2
                                  ? "text-soilPurple"
                                  : index % 3
                                  ? "text-soilOrange"
                                  : "text-soilTurquoise"
                              }`}
                            >
                              {item.score * 10}%
                            </TextHeading2>
                          </div>
                        ) : //  : (
                        //   <TextInputLabel className="text-xs text-black">
                        //     {item.answerContentSmall.replace(".", "")}
                        //   </TextInputLabel>
                        // )
                        null}
                      </div>
                    </div>
                  </div>
                </PopoverScoreReason>
              </div>
            ))
          : null}
      </div>
      {/* <p className="text-soilHeading3 font-poppins mb-6 text-center font-black text-gray-400">
        CULTURE FIT
      </p>
      <div
        className={`mx-auto grid grid-cols-${
          summaryQuestions?.length || 4
        } gap-4`}
      >
        {summaryQuestions
          ? summaryQuestions?.map((item, index) => (
              <PopoverScoreReason size="lg" key={index} question={item}>
                <div className="hover:bg-blue-200">
                  <div className="mx-auto flex h-16 w-auto items-center justify-center">
                    <p className="text-center">
                      <TextLabel1 className="text-black">
                        {item.questionContentSmall.replace(".", "")}
                      </TextLabel1>
                    </p>
                  </div>
                  <div className="mx-auto flex items-center justify-center">
                    <p className="text-center">
                      <TextLabel1 className="text-soilPurple">
                        {item.answerContentSmall.replace(".", "")}
                      </TextLabel1>
                    </p>
                  </div>
                </div>
              </PopoverScoreReason>
            ))
          : null}
      </div> */}

      <Card
        border
        shadow
        className="my-4 max-h-fit overflow-scroll bg-white pb-4 "
      >
        <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrolling-touch flex flex-col space-y-4 p-3">
          <div className="my-4">
            {summaryQuestionSelected &&
            summaryQuestionSelected.subConversationAnswer
              ? summaryQuestionSelected.subConversationAnswer.map(
                  (conversation: any, index: number) => (
                    <>
                      <div className="chat-message p-2" key={index}>
                        <div
                          className={classNames(
                            conversation.role == "assistant"
                              ? ""
                              : "justify-end",
                            "flex items-start"
                          )}
                        >
                          <div
                            className={classNames(
                              conversation.role == "assistant"
                                ? "order-2"
                                : "order-1",
                              "mx-2 flex max-w-[78%] flex-col items-start space-y-2 text-xs"
                            )}
                          >
                            <span
                              // className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600"
                              className={classNames(
                                conversation.role == "assistant"
                                  ? "rounded-tl-none border border-[#D1E4EE] bg-[#EDF2F7]"
                                  : "rounded-tr-none border border-[#BDECF6] bg-[#D9F5FD]",
                                "inline-block whitespace-pre-wrap rounded-lg px-4 py-2"
                              )}
                            >
                              {conversation.content}
                            </span>
                          </div>
                          {/* <img
                          src={Users[chat.user].img}
                          alt="My profile"
                          className="order-1 h-6 w-6 rounded-full"
                        /> */}
                        </div>
                      </div>
                    </>
                  )
                )
              : null}
          </div>
        </div>
      </Card>
    </div>
  );
};
