import { SearchContainer, SearchResult } from "./styles";
import SearchElement from "./SearchElement";
import { Box, Typography } from "@mui/material";
import useSearch from "./useSearch";
import Loading from "src/presentation/components/loading/general";
import NotFound from "src/presentation/theme/assets/icons/not-found.svg";

const Search = () => {
  const { result, loading, keySearch } = useSearch();

  const renderContent = () => {
    if (!result || result?.length === 0) {
      return (
        <Box className="search__result-not-found">
          <img src={NotFound} alt="not-found" />
          <Typography>
            No result found for "
            <span className="search__result-value">{keySearch?.value}</span>"
          </Typography>
        </Box>
      );
    } else {
      return (
        <>
          <Typography className="search__result-title">
            Showing search results for “
            <span className="search__result-value">{keySearch?.value}</span>”
          </Typography>
          {result.map((item) => (
            <SearchElement key={item.userId} data={item} />
          ))}
        </>
      );
    }
  };

  return (
    <SearchContainer>
      <SearchResult>
        {loading ? <Loading size={30} thickness={5} /> : renderContent()}
      </SearchResult>
    </SearchContainer>
  );
};

export default Search;
