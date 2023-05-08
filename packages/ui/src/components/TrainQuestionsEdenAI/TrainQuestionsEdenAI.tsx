import { gql, useMutation } from "@apollo/client";
import { Mutation } from "@eden/package-graphql/generated";
import { useState } from "react";

const ADD_QUESTIONS_TO_COMPANY = gql`
  mutation ($fields: addQuestionsToAskCompanyInput) {
    addQuestionsToAskCompany(fields: $fields) {
      _id
      name
      candidates {
        overallScore
        user {
          _id
          discordName
          discordAvatar
        }
      }
      questionsToAsk {
        bestAnswer
        question {
          _id
          content
        }
      }
    }
  }
`;

export type Question = {
  _id: number;
  content: string;
  bestAnswer: string;
};

type Props = {
  questions: Question[];
  companyID?: string | string[] | undefined;
  // eslint-disable-next-line no-unused-vars
  setQuestions: (questions: Question[]) => void;
  // eslint-disable-next-line no-unused-vars
  setTrainModalOpen: (open: boolean) => void;
};

export const TrainQuestionsEdenAI = ({
  questions = [],
  companyID,
  setQuestions,
  setTrainModalOpen,
}: Props) => {
  const [updateQuestionsCompany] = useMutation(ADD_QUESTIONS_TO_COMPANY, {
    onCompleted({ updateNodesToMember }: Mutation) {
      console.log("updateNodesToMember = ", updateNodesToMember);
    },
    // skip: companyID == "" || companyID == null,
  });

  console.log("questions = ", questions);

  const [newQuestion, setNewQuestion] = useState("");

  const handleQuestionAdd = () => {
    if (newQuestion.trim() !== "") {
      const newId = questions.length + 1;

      console.log("newQuestion = ", newQuestion);
      const newQuestionsToAdd = [
        ...questions,
        { _id: newId, content: newQuestion, bestAnswer: "" },
      ];

      setQuestions(newQuestionsToAdd);
      setNewQuestion("");
    }
  };

  const handleSaveChanges = () => {
    updateQuestionsCompany({
      variables: {
        fields: {
          companyID: companyID,
          questionsToAsk: questions.map((question) => {
            return {
              questionID: question._id,
              bestAnswer: question.bestAnswer,
              questionContent: question.content,
            };
          }),
        },
      },
    });
    setTrainModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Train Questions for Eden AI</h1>
      <ul className="space-y-2">
        {questions.map((question) => (
          <li key={question._id}>
            <p className="font-medium">{question.content}</p>
            <input
              type="text"
              className="rounded border px-2 py-1"
              placeholder="Enter the answer"
              value={question.bestAnswer}
              onChange={(e) => {
                const newQuestions = [...questions];
                const index = newQuestions.findIndex(
                  (q) => q._id === question._id
                );

                newQuestions[index].bestAnswer = e.target.value;
                setQuestions(newQuestions);
              }}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          className="mr-2 rounded border px-2 py-1"
          placeholder="Enter a new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          onClick={handleQuestionAdd}
        >
          Add Question
        </button>
      </div>
      <button
        className="absolute bottom-0 right-0 mb-6 mr-6 mt-4 rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};
