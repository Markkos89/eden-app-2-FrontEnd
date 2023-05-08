import { CandidateType } from "@eden/package-graphql/generated";
import { Avatar, Badge, Loading, TextHeading2 } from "@eden/package-ui";
import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode, useState } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"td"> {
  extraCssClass?: string;
  textColor?: string;
  children: string | ReactNode;
}

const ColumnStyled: FC<InputGroupProps> = ({
  extraCssClass,
  children,
  textColor = "text-gray-900",
  ...otherProps
}) => (
  <td
    className={clsx("text-md px-4 py-1", textColor, extraCssClass)}
    {...otherProps}
  >
    {children}
  </td>
);

type CandidatesTableListProps = {
  candidatesList: CandidateType[];
  fetchIsLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setRowObjectData: (candidate: CandidateType) => void;
};

export const CandidatesTableList: FC<CandidatesTableListProps> = ({
  candidatesList,
  fetchIsLoading,
  setRowObjectData,
}) => {
  const [candidateIDRowSelected, setCandidateIDRowSelected] =
    useState<string>("");

  const handleObjectDataSelection = (candidate: CandidateType) => {
    setRowObjectData(candidate);
    setCandidateIDRowSelected(candidate.user?._id || "");
  };

  return (
    <section className="scrollbar-hide w-full overflow-scroll rounded-md border border-gray-400 bg-white drop-shadow-md">
      <table className="text-md w-full">
        <thead className="bg-slate-200 text-gray-800 shadow-md">
          <tr>
            <th className="min-w-min border-b border-gray-400 py-2">Name</th>
            <th className="border-b border-gray-400 py-2">Match</th>
            <th className="border-b border-gray-400 py-2 pr-2 text-right">
              $/hour
            </th>
            <th className="border-b border-gray-400 py-2">Level</th>
          </tr>
        </thead>
        <tbody>
          {fetchIsLoading ? (
            <tr>
              <td colSpan={8} className="content-center py-2">
                <Loading />
              </td>
            </tr>
          ) : Boolean(candidatesList) ? (
            candidatesList.map((candidate, idx) => (
              <tr
                key={`${candidate.user?._id}-${idx}`}
                onClick={() => handleObjectDataSelection(candidate)}
                className={`${
                  candidateIDRowSelected === candidate.user?._id
                    ? "bg-lime-100"
                    : "even:bg-slate-100"
                } group cursor-pointer  hover:bg-lime-50 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-300`}
              >
                <ColumnStyled extraCssClass="border-r-0 pr-0">
                  <div className="flex flex-nowrap items-center">
                    <Avatar
                      size="xs"
                      src={candidate.user?.discordAvatar!}
                      alt={`${candidate.user?.discordName!.trim()}-avatar`}
                    />
                    <span className="ml-2">{candidate.user?.discordName!}</span>
                  </div>
                </ColumnStyled>
                <ColumnStyled textColor="text-fuchsia-600 text-center">
                  {candidate.overallScore ? (
                    <TextHeading2 className="text-colorFFA9F1 font-black">{`${candidate.overallScore}%`}</TextHeading2>
                  ) : null}
                </ColumnStyled>
                <ColumnStyled extraCssClass="pr-2 text-right">
                  {candidate.user!.budget!.perHour ? (
                    <TextHeading2 className="text-colorFFD02B font-black">
                      ${candidate.user!.budget!.perHour}
                    </TextHeading2>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </ColumnStyled>
                <ColumnStyled extraCssClass="text-center">
                  {candidate?.user?.experienceLevel?.total ? (
                    <Badge
                      colorRGB="153,255,204"
                      text={
                        candidate?.user.experienceLevel?.total
                          ? candidate?.user.experienceLevel?.total <= 3
                            ? "Junior"
                            : candidate?.user.experienceLevel?.total <= 6
                            ? "Mid"
                            : "Senior"
                          : "Entry"
                      }
                      cutText={9}
                    />
                  ) : null}
                </ColumnStyled>
              </tr>
            ))
          ) : (
            <tr>
              <ColumnStyled
                extraCssClass="text-center content-center py-2"
                textColor="black"
                colSpan={8}
              >
                No candidates found
              </ColumnStyled>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
