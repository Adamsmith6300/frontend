const modal = ({ children, close }) => {
  return (
    <div onClick={() => close()} className="overlay grid place-items-center">
      <div className="modal-content-container">{children}</div>
    </div>
  );
};

export default modal;
