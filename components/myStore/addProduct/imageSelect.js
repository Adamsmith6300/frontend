import { useState } from "react";
const index = ({ selectImage, setSelectImage, newVariants, newImages }) => {
  console.log(newImages);
  const [selected, setSelected] = useState(null);
  const saveSelected = () => {
    newVariants[selectImage].image = {
      displayIndex: selected,
      name: newImages[selected].name,
      src: newImages[selected].src,
    };
    setSelectImage(null);
  };
  let images = newImages.map((image, index) => {
    return (
      <img
        onClick={() => setSelected(selected == index ? null : index)}
        className={`cursor-pointer w-100 m-2 ${
          selected == index ? "border border-green-200 shadow-lg" : ""
        }`}
        key={index}
        src={image.src}
      />
    );
  });
  return (
    <div className="">
      <button
        className="btn-no-size-color bg-black px-6 py-2"
        onClick={() => setSelectImage(null)}
      >
        Back
      </button>
      {images.length > 0 ? (
        <div className="mt-3 flex flex-wrap">{images}</div>
      ) : (
        <p className="my-3 text-center ">No images uploaded</p>
      )}
      <div className="text-center mt-3 ">
        {selected != null ? (
          <button
            className="mx-2 btn-no-size-color bg-green-500 px-6 py-2"
            onClick={() => saveSelected()}
          >
            Save
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default index;
