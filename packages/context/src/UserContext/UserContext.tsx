import { Members, ServerTemplate } from "@eden/package-graphql/generated";
import { createContext, Dispatch, useContext } from "react";

export interface UserContextType {
  currentUser?: Members;
  refechProfile: () => void;
  memberServers: ServerTemplate[];
  memberServerIDs: string[];
  selectedServerID: string[];
  setSelectedServerID: Dispatch<string[]>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
  memberServers: [],
  memberServerIDs: [],
  selectedServerID: [],
  // eslint-disable-next-line no-empty-function
  setSelectedServerID: () => {},
});

UserContext.displayName = "UserContext";

export const useUserContext = () => useContext(UserContext);
