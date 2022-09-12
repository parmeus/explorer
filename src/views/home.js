import React from "react";
import styled from "styled-components";
import Search from "../componets/search";

const HomePage = () => {
    return (
        <StyledContainer>
            <div className="logo">Parmeus</div>
            <div className="body-contianer">
                <div className="title">Parmeus Inspector</div>
                <div className="search-block">
                    <Search redirectMode={true} />
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 16px 24px;
    height: 100%;

    .logo {
        font-style: italic;
        font-weight: 700;
        font-size: 24px;
        color: rgb(255, 255, 255);
        cursor: pointer;
    }

    .body-contianer {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* justify-content: center; */
        padding-top: 80px;

        .title {
            color: #fff;
            font-size: 86px;
            /* font-weight: 700; */
            /* font-style: italic; */
            text-align: center;
            margin-bottom: 60px;
        }
        .search-block {
            padding: 0 200px;
        }
    }
`;

export default HomePage;
