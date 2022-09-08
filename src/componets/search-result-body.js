import { Drawer } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HighCode } from "react-highlight-code";
import "react-highlight-code/dist/style.css";
import SingleMatchResult from "./single-match-result";
import PseudoCodeMap from "../consts/pseudo-code-map";
import MultiMatchResult from "./multi-match-result";
import IdentityResult from "./identity-result";
import IsHumanResult from "./is-human-result";

const SearchResultBody = ({ searchType, resultData }) => {
    const [iscodeDrawerVisible, setIscodeDrawerVisible] = useState(false);
    const [resultComponent, setResultComponent] = useState();

    useEffect(() => {
        switch (searchType?.key) {
            case "singleMatch":
                setResultComponent(<SingleMatchResult resultData={resultData} />);
                break;
            case "teamMatch":
                setResultComponent(<MultiMatchResult resultData={resultData} />);
                break;
            case "parmeusIdentity":
                setResultComponent(<IdentityResult resultData={resultData} />);
                break;
            case "isHuman":
                setResultComponent(<IsHumanResult resultData={resultData} />);
                break;
            default:
                setResultComponent(null);
        }
    }, [searchType, resultData]);

    return (
        <StyledContainer>
            <Drawer
                title="Code(JavaScript)"
                placement="right"
                closable={false}
                onClose={() => setIscodeDrawerVisible(false)}
                visible={iscodeDrawerVisible}
                key="code-draw"
                width="700px"
            >
                <HighCode
                    langName="javascript"
                    codeValue={searchType?.key ? PseudoCodeMap[searchType?.key] : null}
                    width="100%"
                ></HighCode>
            </Drawer>

            <div className="result-container">
                <div className="code-draw-link">
                    <span onClick={() => setIscodeDrawerVisible(true)}>
                        View Code <LinkOutlined />{" "}
                    </span>
                </div>
                <div className="result-data-block">{resultComponent}</div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    .code-draw-link {
        cursor: pointer;
        color: #4640f7;
        margin-bottom: 10px;
    }
`;

export default SearchResultBody;
