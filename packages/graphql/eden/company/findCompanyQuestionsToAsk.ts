import { gql } from "@apollo/client";

export const FIND_COMPANY_QUESTIONS = gql`
  query ($fields: findCompanyInput!) {
    findCompany(fields: $fields) {
      _id
      name
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
