import styled from "@emotion/styled";
import COLOR from "src/presentation/theme/Color";

const SearchContainer = styled("div")(() => ({
  width: "100%",
  display: "flex",
  gap: "170px",
  padding: "30px 30px 200px",
  justifyContent: "center",

  ".search__result-categories": {
    width: "25%",
    padding: "30px",
    "> p": {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "32px",
      paddingBottom: "16px",
      marginBottom: "30px",
      borderBottom: `1px solid ${COLOR.neutral.neutral_3}`,
    },
  },

  ".search__result-category": {
    padding: "13px 16px",
    display: "flex",
    gap: "18px",
    cursor: "pointer",
    p: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
      color: COLOR.neutral.neutral_4,
    },
  },

  ".search__result__category-selected": {
    backgroundColor: COLOR.neutral.neutral_6,
    borderRadius: "12px",
    p: {
      color: COLOR.neutral.neutral_1,
    },
  },
}));

const SearchResult = styled("div")(() => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",

  ".search__result-title": {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    color: COLOR.neutral.neutral_4,
    marginBottom: "6px",
  },

  ".search__result-value": {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    color: COLOR.neutral.neutral_1,
  },
}));

const SearchElementContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "fit-content",
  padding: "24px 0",
  borderBottom: `1px solid ${COLOR.neutral.neutral_3}`,

  "> div": {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  ".search__element-avatar": {
    width: "64px",
    height: "64px",
    borderRadius: "100px",
  },
  ".search__element-name": {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "24px",
    color: COLOR.neutral.neutral_1,
  },
  ".search__element-post": {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    color: COLOR.primary,
    borderRadius: "100px",
    backgroundColor: `${COLOR.primary}1f`,
    padding: "2px 8px",
  },
  ".search__element-credit": {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    color: COLOR.link,
    borderRadius: "100px",
    backgroundColor: `${COLOR.link}26`,
    padding: "2px 8px",
  },
  ".search__element-info": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    div: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },
  },
}));

export { SearchContainer, SearchElementContainer, SearchResult };
