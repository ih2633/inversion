import { useState, useCallback } from "react";

export const useSelectCategory = () => {
  const [selectCategory, setSelectCategory] = useState<string>("All");

  const filterCategory = useCallback(
    (category: string) => {
      if (selectCategory === category) {
        setSelectCategory("All");
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
