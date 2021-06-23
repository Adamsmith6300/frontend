const modal = ({ children, close }) => {
  return (
    <div onClick={() => close()} className="overlay grid place-items-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content-container bg-white"
      >
        {children}
      </div>
    </div>
  );
};

export default modal;
