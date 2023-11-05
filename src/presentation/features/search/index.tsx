import React from "react";
import { useLocation } from "react-router-dom";
import { SearchContainer, SearchResult } from "./styles";
import SearchCategories from "./SearchCategories";
import SearchElement from "./SearchElement";
import { Typography } from "@mui/material";

const Search = () => {
  const { search } = useLocation();
  const queries = search
    .substring(1)
    .split("&&")
    .map((query) => {
      const [key, value] = query.split("=");
      return { key, value };
    });
  const keySearch = queries.find((query) => query.key === "keySearch");

  return (
    <SearchContainer>
      <SearchResult>
        <Typography className="search__result-title">
          Showing search results for “
          <span className="search__result-value">{keySearch?.value}</span>”
        </Typography>
        <SearchElement />
        <SearchElement />
        <SearchElement />
      </SearchResult>
    </SearchContainer>
  );
};

export default Search;
