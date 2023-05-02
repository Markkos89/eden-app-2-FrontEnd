import { useState } from "react";

import { Candidate, ColumnsType } from "../src";

export type AccesorCandidateType = keyof Candidate;

function getDefaultSorting(
  defaultTableData: Candidate[],
  columns: ColumnsType[]
) {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter((column) =>
      column.sortbyOrder ? column.sortbyOrder : null
    );

    type ReturnType = {
      accessor: AccesorCandidateType;
      sortbyOrder: "asc" | "desc";
    };

    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    const { accessor = "name", sortbyOrder = "asc" }: ReturnType =
      Object.assign({}, ...filterColumn) as ReturnType;

    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = a[accessor]!.toString().localeCompare(
      b[accessor]!.toString(),
      "en",
      {
        numeric: true,
      }
    );

    1;
    return sortbyOrder === "asc" ? ascending : -ascending;
  });

  return sorted;
}

export const useSortableTable = (data: Candidate[], columns: ColumnsType[]) => {
  const [tableData, setTableData] = useState(getDefaultSorting(data, columns));

  const handleSorting = (
    sortField: AccesorCandidateType,
    sortOrder: "asc" | "desc"
  ) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) {
          return 0;
        }
        return (
          a[sortField]!.toString().localeCompare(
            b[sortField]!.toString(),
            "en",
            {
              numeric: true,
            }
          ) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  return [tableData, handleSorting];
};
