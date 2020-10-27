const index = ({ activeSection, updateActiveSection }) => {
  let options = ["Orders", "Products", "Store Details", "Payments"].map(
    (option, index) => {
      let active = activeSection == index;
      return (
        <p
          onClick={() => updateActiveSection(index)}
          className={`px-4 py-2 shadow cursor-pointer ${
            active ? " bg-black text-white" : ""
          }`}
          key={index + option}
        >
          {option}
        </p>
      );
    }
  );

  return <div className="w-64">{options}</div>;
};

export default index;
