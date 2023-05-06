import { gql } from "@apollo/client";

// import { CompanyCandidatesFragment } from "../fragments/companyCandidatesFragment";

export const FIND_COMPANY_FULL = gql`
  query ($fields: findCompanyInput!) {
    findCompany(fields: $fields) {
      _id
      name
      candidates {
        overallScore
        user {
          _id
          discordName
          discordAvatar
          memberRole {
            _id
            title
          }
          budget {
            perHour
          }
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
          previousProjects {
            title
            positionName
          }
          experienceLevel {
            total
            years
          }
        }
        readyToDisplay
        summaryQuestions {
          questionID
          questionContent
          answerContent
          reason
          score
          bestAnswerCompany
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
// ${CompanyCandidatesFragment}
