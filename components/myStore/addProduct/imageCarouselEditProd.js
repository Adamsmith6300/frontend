import { useState, useRef } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
// import { button } from "semantic-ui-react";
import { LargeLoader } from "../../loaders";

const index = ({
  setMainImage,
  newImages,
  setNewImages,
  imageSrcs,
  setImageSrcs,
}) => {
  const imageInput = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultImg =
    process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL + "/sampleBanner";
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  let imageSrcsReady = imageSrcs.length > 0;
  let imgURL = imageSrcsReady ? imageSrcs[currentIndex] : null;

  const deleteImage = (index) => {
    imageSrcs.splice(index, 1);
    newImages.splice(index, 1);
  };
  return (
    <>
      <input
        onChange={(e) => {
          if (FileReader && e.target.files && e.target.files.length) {
            var fileReader = new FileReader();
            fileReader.onloadend = () => {
              setImageSrcs([...imageSrcs, fileReader.result]);
              setCurrentIndex(imageSrcs.length);
              setSelectedImg(null);
              imageInput.current.value = "";
            };
            setNewImages([
              ...newImages,
              {
                uploadFile: e.target.files[0],
                name: e.target.files[0].name,
              },
            ]);
            fileReader.readAsDataURL(e.target.files[0]);
          } else {
            console.log("No file reader");
          }
        }}
        type="file"
        id="imageInput"
        ref={imageInput}
        style={{ display: "none" }}
      />
      {loading ? <LargeLoader /> : null}
      <div>
        <div className="w-full">
          <img
            onClick={() => {
              if (imageSrcsReady)
                setSelectedImg(
                  selectedImg == currentIndex ? null : currentIndex
                );
            }}
            className={`w-300 mx-auto ${
              imageSrcsReady ? "cursor-pointer" : null
            }`}
            src={!imageSrcsReady ? defaultImg : imgURL}
            alt=""
            align="center"
          />
          <div className="w-full h-16 flex justify-between">
            <button className="flex justify-center cursor-pointer">
              {imageSrcs.length > 1 ? (
                <AiFillCaretLeft
                  onClick={() => {
                    setCurrentIndex(Math.max(currentIndex - 1, 0));
                    setSelectedImg(null);
                  }}
                  className={`align-middle h-full text-2xl`}
                />
              ) : null}
            </button>
            <button className="flex justify-center cursor-pointer">
              {imageSrcs.length > 1 ? (
                <AiFillCaretRight
                  onClick={() => {
                    setCurrentIndex(
                      Math.min(currentIndex + 1, imageSrcs.length - 1)
                    );
                    setSelectedImg(null);
                  }}
                  className={`align-middle h-full text-2xl`}
                />
              ) : null}
            </button>
          </div>
        </div>
        <div className="flex justify-center my-3">
          <button
            className="btn-no-size-color bg-black px-6 py-2 mx-3"
            onClick={() => {
              imageInput.current.click();
            }}
          >
            Upload Image
          </button>
          {selectedImg != null ? (
            <button
              className="btn-no-size-color bg-red-500 px-6 py-2 mx-3"
              onClick={() => {
                const index = currentIndex;
                setCurrentIndex(0);
                deleteImage(index);
                setSelectedImg(null);
              }}
            >
              <span className="mr-2">Delete Selected</span>
              <MdDelete className="inline cursor-pointer" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default index;
