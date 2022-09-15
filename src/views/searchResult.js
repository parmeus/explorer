import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SearchResultBody from "../componets/search-result-body";
import Search from "../componets/search";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SearchResult = () => {
    const [resultSearchType, setResultSearchType] = useState();
    const [resultData, setResultData] = useState();
    const [isSearching, setIsSearching] = useState(false);

    const onSearchResult = useCallback((searchType, result) => {
        setResultSearchType(searchType);
        setResultData(result);
    }, []);

    return (
        <StyledContainer>
            <div className="logo">
                <span
                    // onClick={() => {
                    //     navigate("/", {
                    //         replace: true,
                    //     });
                    // }}
                >
                    Parmeus
                </span>
            </div>

            <div className="limit-width-container">
                <div className="search-container">
                    <Search autoSearch={true} onSearchResult={onSearchResult} onSearching={setIsSearching} />
                </div>
                <div className="result-container">
                    <Spin spinning={isSearching} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                        <SearchResultBody searchType={resultSearchType} resultData={resultData} />
                    </Spin>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div.attrs({
    className: "search-result",
})`
    padding: 16px 24px;

    .logo {
        font-style: italic;
        font-weight: 700;
        font-size: 24px;
        color: rgb(255, 255, 255);
        /* cursor: pointer; */
    }

    .limit-width-container {
        max-width: 1440px;
        margin: 80px auto 0;

        .search-container {
            // max-width: 800px;
        }

        .result-container {
            margin-top: 80px;
        }
    }
`;

export default SearchResult;
