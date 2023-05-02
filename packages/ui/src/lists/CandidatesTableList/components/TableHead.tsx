import { FC, useState } from "react";

import type { AccesorCandidateType } from "../../../../utils/useSortableTable";
import type { ColumnsType } from "../types";

type TableHeadProps = {
  columns: ColumnsType[];
  // eslint-disable-next-line no-unused-vars
  handleSorting: (
    // eslint-disable-next-line no-unused-vars
    accessor: AccesorCandidateType,
    // eslint-disable-next-line no-unused-vars
    sortOrder: "asc" | "desc"
  ) => void;
};

export const TableHead: FC<TableHeadProps> = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: AccesorCandidateType) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";

    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";

          return (
            <th
              key={accessor}
              onClick={
                // eslint-disable-next-line no-empty-function
                sortable ? () => handleSortingChange(accessor) : () => {}
              }
              className={cl}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
