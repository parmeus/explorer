import { Button, Checkbox, Dropdown, Input, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import RestService from "../common/rest-service";

const SearchTypes = [
    {
        label: "Single Match",
        key: "singleMatch",
        withTraitOption: true,
        tip: "Search who are similar with you among the following traits",
        placeHolder: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        defaultSearch: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        searchAction: RestService.SingleMatch,
    },
    {
        label: "Team Match",
        key: "teamMatch",
        withTraitOption: true,
        tip: "Find the simularity among addresses with following traits",
        placeHolder:
            "Addresses seperated by ';' , ex: 0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B;0x18c081B0ed72bd5D11192Ff7584214dAB265...",
        defaultSearch: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B;0x18c081B0ed72bd5D11192Ff7584214dAB265d218;0x048d73b36921321878c7fd9d8d2c2c69857b6784;0x27103c2e31b51cd8a8d0c09415c10016e81ed963;0x01e4fbb2cea00da319f786525c5f568e41e688e7;0xc359ee496265231e9f38359fe1fc3a7b0bc857df;0x3d005090005723e2f8391ada83d77da0d9700783;0x807b3cf6a5110d55b4664cfc65282ecc55e9cdea",
        searchAction: RestService.TeamMatch,
    },
    {
        label: "Parmeus Identity",
        key: "parmeusIdentity",
        tip: "Find parmeus identity with address",
        placeHolder: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        defaultSearch: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        searchAction: RestService.parmeusIdentity,
    },
    {
        label: "Is Human",
        key: "isHuman",
        tip: "Check if address is human",
        placeHolder: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        defaultSearch: "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        searchAction: RestService.isHuman,
    },
];

const TraitsOptions = [
    {
        label: "Critical Thinking",
        value: "critical_thinking",
    },
    {
        label: "Curiosity",
        value: "curiosity",
    },
    {
        label: "Fluid Intelligence",
        value: "fluid_intelligence",
    },
    {
        label: "Flexibility",
        value: "flexibility",
    },
    {
        label: "Grit",
        value: "grit",
    },
    {
        label: "Initiative",
        value: "initiative",
    },
];

const Search = ({ redirectMode = false, autoSearch = false, onSearchResult = () => {}, onSearching = () => {} }) => {
    const navigate = useNavigate();
    const [currentSearchType, setCurrentSearchType] = useState(SearchTypes[0]);
    const [currentSelectedTraits, setCurrentSelectedTraits] = useState(TraitsOptions.map(item => item.value));
    const [searchText, setSearchText] = useState();
    const [autoSearched, setAutoSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const changeType = useCallback(event => {
        if (event?.key) {
            const tempType = SearchTypes.find(item => item.key === event.key);
            setCurrentSearchType(tempType);
            // setSearchText(null);
        }
    }, []);

    const onInputTextChange = useCallback(event => {
        let tempValue = event?.target?.value;
        if (tempValue.trim() === "") {
            tempValue = null;
        }
        setSearchText(tempValue);
    }, []);

    const search = useCallback(
        (searchType, traits, text) => {
            if (!autoSearched) {
                setAutoSearched(true);
            }
            text = text ?? searchType?.defaultSearch;
            if (!isSearching && text && text.trim() !== "") {
                setIsSearching(true);
                onSearching?.(true);
                searchType
                    ?.searchAction?.(text, traits)
                    .then(resp => {
                        onSearchResult?.(searchType, resp?.data);
                    })
                    .catch(err => {
                        onSearchResult?.(searchType, {});
                    })
                    .finally(() => {
                        setIsSearching(false);
                        onSearching?.(false);
                    });
            }
        },
        [onSearchResult, isSearching, autoSearched, onSearching]
    );

    const onSearch = useCallback(() => {
        if (redirectMode) {
            let params = `type=${encodeURIComponent(currentSearchType?.key)}`;
            params += `&traits=${encodeURIComponent(currentSelectedTraits?.join(","))}`;
            if (searchText) {
                params += `&text=${encodeURIComponent(searchText)}`;
            }
            navigate(`/search?${params}`);
        } else {
            search(currentSearchType, currentSelectedTraits, searchText);
        }
    }, [searchText, currentSelectedTraits, redirectMode, currentSearchType, navigate, search]);

    const onTraitSelected = useCallback(selectedTraits => {
        setCurrentSelectedTraits(selectedTraits);
    }, []);

    useEffect(() => {
        if (autoSearch && !autoSearched) {
            const params = new URLSearchParams(window.location.search);
            const searchTypeKey = params.get("type");
            const traits = params.get("traits");
            const text = params.get("text");

            let tempType;
            if (searchTypeKey) {
                tempType = SearchTypes.find(item => item.key === decodeURIComponent(searchTypeKey));
                if (tempType) {
                    setCurrentSearchType(tempType);
                }
            }
            let traitsArr;
            if (traits) {
                traitsArr = decodeURIComponent(traits)?.split(",");
                if (traitsArr) {
                    setCurrentSelectedTraits(traitsArr);
                }
            }
            setSearchText(text);

            search(tempType, traitsArr, text);
        }
    }, [autoSearch, search, autoSearched]);

    return (
        <StyledContainer>
            <Input
                className="search-input"
                placeholder={currentSearchType?.placeHolder ?? "Please enter address"}
                value={searchText}
                onChange={onInputTextChange}
                disabled={isSearching}
            />
            <Dropdown
                className="type-dropdown"
                disabled={isSearching}
                trigger={["click"]}
                overlay={
                    <Menu
                        onClick={changeType}
                        items={SearchTypes.map(item => {
                            return {
                                label: item.label,
                                key: item.key,
                            };
                        })}
                    />
                }
            >
                <Button className="dropdown-button">
                    <div className="selected-type">{currentSearchType?.label}</div>
                    <CaretDownOutlined />
                </Button>
            </Dropdown>
            <div className="search-button" onClick={onSearch}>
                Search
            </div>
            <div className="tip">{currentSearchType?.tip}</div>
            <div
                className={cn({
                    "traits-option-block": true,
                    visible: currentSearchType?.withTraitOption,
                })}
            >
                {/* <div className="label">option traits</div> */}
                <Checkbox.Group
                    options={TraitsOptions}
                    // defaultValue={currentSelectedTraits}
                    value={currentSelectedTraits}
                    onChange={onTraitSelected}
                />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div.attrs({
    className: "parmeus-search",
})`
    position: relative;
    .type-dropdown {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 9;
        /* background-color: ; */
        height: 40px;
        border: solid 1px #fff;
        border-radius: 40px;
        font-size: 16px;

        &:hover {
            color: #4983f5;
        }

        &.dropdown-button {
            width: 160px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .search-input {
        height: 80px;
        border-radius: 60px;
        /* border: solid 1px #fff; */
        background-color: #282828;
        font-size: 16px;
        padding: 0 190px;

        &:focus {
            border: none;
            background-color: #353535;
        }
    }
    .search-button {
        position: absolute;
        top: 15px;
        right: 20px;
        z-index: 9;

        font-weight: 800;
        font-size: 16px;
        text-align: center;
        color: rgb(7, 53, 54);
        padding: 12px 12px;
        width: 160px;
        cursor: pointer;
        user-select: none;
        background: linear-gradient(
            116.33deg,
            rgb(132, 229, 255) -18.44%,
            rgb(171, 232, 249) 34.29%,
            rgb(120, 226, 255) 61.91%,
            rgb(82, 217, 255) 130.08%
        );
        border-radius: 32px;
    }
    .tip {
        margin-top: 10px;
        font-size: 14px;
        color: #888888;
        margin-left: 35px;
    }
    .traits-option-block {
        padding: 10px 35px;
        display: none;

        &.visible {
            display: block;
        }

        .label {
            font-size: 16px;
            color: #fff;
            margin-bottom: 5px;
        }
    }
`;

export default Search;
