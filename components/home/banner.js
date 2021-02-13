const banner = ({ bgSrc, heading, content }) => {
  let bgStyle = {
    backgroundImage: `url(${bgSrc})`,
  };
  return (
    <div style={bgStyle} className="banner">
      <div className="banner-content">
        <h2 className="text-black">{heading}</h2>
        <p className="my-6">{content}</p>
        <button className="standard-btn">Signup</button>
      </div>
    </div>
  );
};

export default banner;
