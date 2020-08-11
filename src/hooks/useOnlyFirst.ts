import { useCallback, useState } from "react";

/**
 * 初回しか表示させない制御をする際に利用する
 */
export const useOnlyFirst = (key: string) => {
  const [visited, setVisited] = useState(
    typeof localStorage !== "undefined"
      ? Boolean(localStorage.getItem(key))
      : false);

  const visit = useCallback(() => {
    typeof localStorage !== "undefined"
     && localStorage.setItem(key, "true")
    setVisited(true);
  }, [key]);

  return {
    visited,
    visit
  };
};
