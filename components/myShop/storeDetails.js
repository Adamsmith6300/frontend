const StoreDetails = ({ info }) => {
  let details = [];
  if (info) {
    details = Object.entries(info).map((entry, index) => {
      return (
        <li key={index + entry[0]}>
          <span>{entry[0]}:</span>
          <span>{entry[1]}</span>
        </li>
      );
    });
  }
  return (
    <div>
      <h2>Store Details</h2>
      <ul className="list-reset">{details}</ul>
    </div>
  );
};

export default StoreDetails;
