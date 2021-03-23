const modal = ({ children, open }) => {
  return (
    <div
      onClick={() => open(false)}
      className="overlay grid place-items-center"
    >
      <div className="modal-content-container">{children}</div>
    </div>
  );
};

export default modal;
