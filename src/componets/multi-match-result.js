import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

const AddressCell = ({ value }) => {
    const [shortText, setShortText] = useState("");
    const [fullText, setFullText] = useState("");

    useEffect(() => {
        if (typeof value === "number") {
            setFullText(`unknown_${value}`);
            setShortText(`unknown_${value}`);
        } else {
            setFullText(value);
            setShortText(`${value}`.slice(0, 6) + "..." + `${value}`.slice(-4));
        }
    }, [value]);

    return (
        <Tooltip placement="topLeft" title={fullText}>
            <div style={{ cursor: "pointer" }}>{shortText}</div>
        </Tooltip>
    );
};

const MultiMatchResult = ({ resultData }) => {
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const matrixIdx = resultData?.matrixIndex;
        const matrixData = resultData?.matrixData;
        if (matrixIdx && matrixData) {
            const cellWitdh = (100 / (matrixIdx.length + 1)).toFixed(2) + "%";
            const tempColumns = matrixIdx.map(item => {
                return {
                    dataIndex: `${item}`,
                    title: <AddressCell value={item} />,
                    width: cellWitdh,
                    render: value => value.toFixed(2),
                };
            });
            tempColumns.unshift({
                dataIndex: "address",
                width: cellWitdh,
                render: value => <AddressCell value={value} />,
            });

            setColumns(tempColumns);

            const tempTableData = matrixData.map((data, idx) => {
                const raw = {
                    address: matrixIdx[idx],
                    key: matrixIdx[idx],
                };
                data.forEach((d, j) => {
                    raw[`${matrixIdx[j]}`] = d;
                });
                return raw;
            });

            setTableData(tempTableData);
        }
    }, [resultData]);

    return <Table columns={columns} dataSource={tableData} pagination={false}></Table>;
};

export default MultiMatchResult;
