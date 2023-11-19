import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "src/common/constants/route";
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
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { profile } = useAppSelector((state) => state.auth);

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

  function navigateUserProfile(userId: string) {
    navigate(`/profile/${userId}`);
  }

  useEffect(() => {
    handleSearch();
  }, [profile]);

  return { result, loading, keySearch, navigateUserProfile };
}

export default useSearch;
