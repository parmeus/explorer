import { Table } from "antd";
import React from "react";

const columns = [
    {
        title: "Address",
        key: "address",
        dataIndex: "address",
    },
    {
        title: "Similarity",
        key: "similarity",
        dataIndex: "similarity",
        render: data => {
            return data.toFixed(2);
        },
    },
];

const SingleMatchResult = ({ resultData }) => {
    return (
        <Table
            columns={columns}
            dataSource={resultData?.result?.map(item => {
                item.key = item.address;
                return item;
            })}
            size="large"
        ></Table>
    );
};

export default SingleMatchResult;
