import { Modal, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UnlockOutlined } from "@ant-design/icons";
import RestService from "../common/rest-service";

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

const IdentityResult = ({ resultData }) => {
    const [tableData, setTableData] = useState([]);

    const decryptAddress = useCallback(encrypedAddr => {
        RestService.decryptAddress(encrypedAddr).then(resp => {
            if (resp.data) {
                Modal.info({
                    title: "The decrypted address is",
                    content: (
                        <div
                            style={{
                                padding: "6px 8px",
                                backgroundColor: "#000",
                                borderRadius: "8px",
                                textAlign: "center",
                            }}
                        >
                            {resp.data?.trim()}
                        </div>
                    ),
                    onOk() {},
                    width: "500px",
                    centered: true,
                });
            }
        });
    }, []);

    useEffect(() => {
        if (resultData) {
            const tempData = [];

            for (let key in resultData) {
                tempData.push({
                    name: key,
                    key: key,
                    value:
                        key === "primaryAddress" ? (
                            <div>
                                <span>{resultData[key]}</span>
                                <span onClick={() => decryptAddress(resultData[key])}>
                                    <UnlockOutlined
                                        style={{ marginLeft: "5px", color: "#0074d3", cursor: "pointer" }}
                                    />
                                </span>
                            </div>
                        ) : (
                            resultData[key]
                        ),
                });
            }

            setTableData(tempData);
        }
    }, [resultData, decryptAddress]);

    return <Table columns={columns} dataSource={tableData} pagination={false}></Table>;
};

export default IdentityResult;
