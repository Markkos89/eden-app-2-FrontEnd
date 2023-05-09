import { gql } from "@apollo/client";

export const FIND_MEMBER = gql`
  query findMember($fields: findMemberInput) {
    findMember(fields: $fields) {
      _id
      discordAvatar
      discordName
      bio
      archiveProjects
      discriminator
      hoursPerWeek
      interest
      timeZone
      location
      projects {
        champion
        favorite
        info {
          _id
          description
          title
        }
      }
      budget {
        perHour
      }
      links {
        name
        url
      }
      memberRole {
        _id
        title
      }
      nodes {
        nodeData {
          aboveNodes {
            _id
            name
            node
          }
          _id
          name
          node
        }
      }
      previousProjects {
        title
        description
        startDate
        endDate
      }
      # endorsements {
      #   endorser {
      #     _id
      #     discordName
      #     discordAvatar
      #     discriminator
      #   }
      #   endorsementMessage
      #   arweaveTransactionID
      # }
      endorsementsReceive {
        _id
        userSend {
          discordName
          discordAvatar
        }
        stars
        stake
        endorsementMessage
      }
      endorseSummary {
        summary
        mainNodes {
          node {
            _id
            name
          }
          confidence
        }
        averageStars
        averageStake
        totalStake
        numberEndorsement
        endorsers {
          discordName
        }
      }
      experienceLevel {
        total
        years
      }
      preferences {
        findCoFounder {
          interestedMatch
        }
        findMentee {
          interestedMatch
        }
        findMentor {
          interestedMatch
        }
        findProject {
          interestedMatch
        }
        findUser {
          interestedMatch
        }
      }
    }
  }
`;
