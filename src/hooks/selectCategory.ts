import { useState, useCallback } from "react";

export const useSelectCategory = () => {
  const [selectCategory, setSelectCategory] = useState("all");

  const filterCategory = useCallback(
    (category: string) => {
      if (selectCategory === category) {
        setSelectCategory("all");
      } else {
        switch (category) {
          case "Skill":
            setSelectCategory("Skill");
            break;
          case "Note":
            setSelectCategory("Note");
            break;
        }
      }
    },
    [selectCategory]
  );

  return [selectCategory, filterCategory];
};
