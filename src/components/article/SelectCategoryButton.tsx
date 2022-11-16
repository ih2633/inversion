
const SelectCategoryButton = (props) => {


  return (
    <div className="flex space-x-3">
      <button
        className={`badge-primary ${props.selectCategory === "Skill" ? "" : "badge-outline"
          } badge h-10 w-16 font-bold`}
        onClick={() => props.filterCategory("Skill")}
      >
        Skill
      </button>
      <button
        className={`badge-secondary ${props.selectCategory === "Note" ? "" : "badge-outline"
          } badge h-10 w-16 font-bold`}
        onClick={() => props.filterCategory("Note")}
      >
        Note
      </button>
    </div>
  );
};

export default SelectCategoryButton;