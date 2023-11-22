import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/data/redux/Hooks";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { Profile } from "src/domain/models/auth";

function useSearch() {
  const [result, setResult] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const homeRepository = HomeRepository.create();
  const { search } = useLocation();
  const queries = search
    .substring(1)
    .split("&&")
    .map((query) => {
      const [key, value] = query.split("=");
      return { key, value };
    });
  const keySearch = queries.find((query) => query.key === "keySearch");
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  async function handleSearch() {
    try {
      setLoading(true);
      const res = await homeRepository.getUsers({
        keySearch: keySearch?.value,
        page: 1,
        limit: 5,
        accessToken,
      });
      setResult(
        res?.users?.filter(
          (user) =>
            user?.walletAddress?.toLowerCase() !==
            profile?.walletAddress?.toLowerCase()
        )
      );
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  }

  function navigateUserProfile(walletAddress: string) {
    navigate(`/profile/${walletAddress.slice(2)}`);
  }

  useEffect(() => {
    handleSearch();
  }, [search]);

  return { result, loading, keySearch, navigateUserProfile };
}

export default useSearch;
