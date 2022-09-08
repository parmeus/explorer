import { Table } from "antd";
import React, { useEffect, useState } from "react";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Value",
        dataIndex: "value",
    },
];

const IsHumanResult = ({ resultData }) => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (resultData) {
            const tempData = [];
            for (let key in resultData) {
                if (key !== "badge") {
                    tempData.push({
                        name: key,
                        key: key,
                        value: resultData[key],
                    });
                } else {
                    for (let bk in resultData.badge) {
                        if (bk === "name") {
                            tempData.push({
                                name: resultData.badge.name ?? "",
                                key: "badge.name",
                                value: resultData.badge.unlocked ? "True" : "False",
                            });
                        } else if (bk === "unlocked") {
                            // do nothing
                        } else {
                            tempData.push({
                                name: bk,
                                key: `badge.${bk}`,
                                value: resultData.badge[bk],
                            });
                        }
                    }
                }
            }

            setTableData(tempData);
        }
    }, [resultData]);

    return <Table columns={columns} dataSource={tableData} pagination={false}></Table>;
};

export default IsHumanResult;
