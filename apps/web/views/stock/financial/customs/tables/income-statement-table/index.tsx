"use client";

import { NewIncomeStatementSchema } from "@/mocks/stock-financial";
import { buildFromSchema, countVisibleNodes, ROW_HEIGHT } from "@/utils/build-table-data";
import { formatToMillion } from "@finranks/design-system/lib/utils";
import { TreeState, TreeTable } from "cp-react-tree-table";
import { useEffect, useMemo, useState } from "react";

function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const onChange = () => setIsMobile(mq.matches);
        onChange();
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, [breakpoint]);

    return isMobile;
}

const IncomeStatementTable = ({ _, view, newData }: any) => {
    const isMobile = useIsMobile(768);

    const [treeData, setTreeDataValue] = useState(() => ({
        treeValue: TreeState.create(buildFromSchema(NewIncomeStatementSchema, newData.financial_data[view])),
    }));

    const [columnDefs, setColumnDefs] = useState(() => newData.periods[view].fiscal_periods);

    useEffect(() => {
        setTreeDataValue({
            treeValue: TreeState.create(buildFromSchema(NewIncomeStatementSchema, newData.financial_data[view])),
        });
        setColumnDefs(newData.periods[view].fiscal_periods);
    }, [view, newData]);

    const tableHeight = useMemo(() => {
        const h = countVisibleNodes(treeData?.treeValue?.data as any) * ROW_HEIGHT;
        const max = isMobile ? 420 : 560;
        const min = 260;
        return Math.max(min, Math.min(h, max));
    }, [treeData, isMobile]);

    const renderExpensesCell = (row: any, colIndex: number) => {
        const value = row.data.values[colIndex];
        if (value === null || value === undefined) {
            return <span className="expenses-cell">-</span>;
        }

        return (
            <span className="expenses-cell">
                {formatToMillion(value)}
            </span>
        );
    };

    const renderIndexCell = (row: any) => {
        const isExpanded = row.$state.isExpanded;

        return (
            <div
                style={{ paddingLeft: row.metadata.depth * (isMobile ? 10 : 12) + "px" }}
                className={row.metadata.hasChildren ? "with-children" : "without-children"}
            >
                {row.metadata.hasChildren ? (
                    <button
                        className={`toggle-button ${isExpanded ? "expanded" : ""}`}
                        onClick={row.toggleChildren}
                    >
                        <svg height="20" fill="#fff" width="20" viewBox="0 0 20 20">
                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                        </svg>
                    </button>
                ) : null}

                <span className="truncate">{row.data.name}</span>
            </div>
        );
    };

    const handleOnChange = (value: any) => setTreeDataValue({ treeValue: value });

    const nameColBasis = isMobile ? "260px" : "520px";
    const valueColBasis = isMobile ? "140px" : "180px";

    const minTableWidth = useMemo(() => {
        const name = parseInt(nameColBasis, 10);
        const val = parseInt(valueColBasis, 10);
        return name + columnDefs.length * val;
    }, [nameColBasis, valueColBasis, columnDefs.length]);


    return (
        <div className="financials-table w-full">
            <div className="w-full overflow-x-auto overflow-y-hidden">
                <div style={{ minWidth: minTableWidth }}>
                    <TreeTable
                        height={tableHeight}
                        headerHeight={isMobile ? 44 : 52}
                        onChange={handleOnChange}
                        value={treeData.treeValue}
                    >
                        <TreeTable.Column
                            basis={nameColBasis}
                            // @ts-expect-error
                            grow="1"
                            renderCell={renderIndexCell}
                            renderHeaderCell={() => <span>Name</span>}
                        />

                        {columnDefs.map((col: any, index: number) => (
                            <TreeTable.Column
                                key={index}
                                basis={valueColBasis}
                                // @ts-expect-error
                                grow="0"
                                renderCell={(row) => renderExpensesCell(row, index)}
                                renderHeaderCell={() => <span>{col}</span>}
                            />
                        ))}
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default IncomeStatementTable;
