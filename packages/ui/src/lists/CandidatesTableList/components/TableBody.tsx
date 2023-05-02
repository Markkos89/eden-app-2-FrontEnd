import { FC } from "react";

import { AccesorCandidateType } from "../../../../utils/useSortableTable";
import { Candidate, ColumnsType } from "../types";

type TableBodyProps = {
  tableData: Candidate[];
  columns: ColumnsType[];
};

export const TableBody: FC<TableBodyProps> = ({ tableData, columns }) => {
  return (
    <>
      {tableData.map((data: Candidate) => {
        return (
          <tr key={data._id}>
            {columns.map(({ accessor }: { accessor: AccesorCandidateType }) => {
              const tData = data[accessor] ? data[accessor] : "——";

              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </>
  );
};
