import { gql, useQuery, useSubscription } from "@apollo/client";
import { FIND_CURRENTUSER, FIND_CURRENTUSER_SUB } from "@eden/package-graphql";
import { Members, ServerTemplate } from "@eden/package-graphql/generated";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";

// import { isAllServers, isEdenStaff } from "../../data";
import { UserContext } from "./UserContext";

export const FIND_SERVERS = gql`
  query ($fields: findServersInput) {
    findServers(fields: $fields) {
      _id
      name
      serverAvatar
      serverType
      channel {
        chatID
        forumID
      }
    }
  }
`;

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();

  const { id } = session?.user || { id: null };

  const [memberServers, setMemberServers] = useState<ServerTemplate[]>([]);
  const [selectedServerID, setSelectedServerID] = useState<string[]>([]);
  const [memberServerIDs, setMemberServerIDs] = useState<string[]>([]);

  const [currentUser, setCurrentUser] = useState<Members>();

  const { data: dataMember, refetch: refechProfile } = useQuery(
    FIND_CURRENTUSER,
    {
      variables: {
        fields: {
          _id: id,
        },
      },
      skip: !id,
      // context: { serviceName: "soilservice" },
      ssr: false,
      onCompleted: (data) => {
        // console.log("dataMember", data);
        // if user is not found, remove access token. This is in case the user is not in the db but has a valid access token
        if (!data.findMember) localStorage.removeItem("eden_access_token");
      },
    }
  );

  useSubscription(FIND_CURRENTUSER_SUB, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id,
    // context: { serviceName: "soilservice" },
  });

  useQuery(FIND_SERVERS, {
    variables: {
      fields: {
        _id: memberServerIDs,
      },
    },
    skip: memberServerIDs.length === 0,
    // context: { serviceName: "soilservice" },
    onCompleted: (data) => {
      setMemberServers([...data.findServers]);
      // setSelectedServer(data.findServers[0]);
    },
  });

  // if (dataServers) console.log("dataServers", dataServers?.findServers);

  useMemo(() => {
    if (dataMember) {
      setMemberServerIDs(dataMember.findMember?.serverID || []);
      setSelectedServerID(dataMember.findMember?.serverID || []);
      if (currentUser?._id !== dataMember.findMember?._id) {
        setCurrentUser(dataMember.findMember);
      }
    }

    if (dataMember && process.env.NODE_ENV === "development") {
      console.log(`==== current USER ====`);
      console.log(dataMember.findMember);
      console.log(`==== ----------- ====`);
    }
  }, [currentUser?._id, dataMember]);

  const injectContext = {
    currentUser,
    refechProfile: refechProfile,
    memberServers,
    memberServerIDs,
    selectedServerID,
    setSelectedServerID,
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
