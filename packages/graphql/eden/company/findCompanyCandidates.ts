import { gql } from "@apollo/client";

import { CompanyCandidatesFragment } from "../fragments/companyCandidatesFragment";

export const FIND_COMPANY_CANDIDATES = gql`
  query ($fields: findCompanyInput!) {
    findCompany(fields: $fields) {
      _id
      name
      ...CompanyCandidatesFragment
    }
  }
  ${CompanyCandidatesFragment}
`;
