import { useState, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Loader } from "semantic-ui-react";

import {
  getPresignedProductImgURL,
  postImageUpload,
} from "../../../store/helpers";

const index = ({ setMainImage, newImages, setNewImages, MerchantId }) => {
  const imageInput = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultImg =
    process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL + "/sampleBanner";
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  let imageSrcsReady = newImages.length > 0;
  let imgURL = imageSrcsReady ? newImages[currentIndex].src : null;

  const deleteImage = (index) => {
    newImages.splice(index, 1);
  };
  const uploadImage = async (newImage) => {
    try {
      let { data } = await getPresignedProductImgURL({
        MerchantId: MerchantId,
        name: newImage.name,
      });
      if (data) {
        let uploadImageResp = await postImageUpload(newImage.uploadFile, data);

        return (
          process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL +
          "/" +
          MerchantId +
          "/products/" +
          newImage.name
        );
      } else {
        throw { resp, file };
      }
    } catch (err) {
      console.log(err);
      console.log("FAILED TO UPLOAD", newImages.name);
      return null;
    }
  };
  return (
    <>
      <input
        onChange={async (e) => {
          setLoading(true);
          e.persist();
          if (FileReader && e.target.files && e.target.files.length) {
            let newImage = {
              uploadFile: e.target.files[0],
              name: e.target.files[0].name.replace(/[^0-9a-z]/gi, ""),
            };
            let uploadSrc = await uploadImage(newImage);
            if (uploadSrc) {
              var fileReader = new FileReader();
              fileReader.onloadend = () => {
                setNewImages([...newImages, { ...newImage, src: uploadSrc }]);
                setCurrentIndex(newImages.length);
                setSelectedImg(null);
                imageInput.current.value = "";
              };
              fileReader.readAsDataURL(e.target.files[0]);
              setLoading(false);
            } else {
              imageInput.current.value = "";
            }
          } else {
            console.log("No file reader");
          }
        }}
        type="file"
        id="imageInput"
        ref={imageInput}
        style={{ display: "none" }}
      />
      <div>
        {loading ? (
          <div className="text-center h-100">
            <Loader active className="inline" />
          </div>
        ) : (
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
                {newImages.length > 1 ? (
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
                {newImages.length > 1 ? (
                  <AiFillCaretRight
                    onClick={() => {
                      setCurrentIndex(
                        Math.min(currentIndex + 1, newImages.length - 1)
                      );
                      setSelectedImg(null);
                    }}
                    className={`align-middle h-full text-2xl`}
                  />
                ) : null}
              </button>
            </div>
          </div>
        )}
        <p>Uploaded ({newImages.length}/4)</p>
        <div className="flex justify-center my-3">
          {newImages.length < 5 ? (
            <button
              className="btn-no-size-color bg-black px-6 py-2 mx-3"
              onClick={() => {
                imageInput.current.click();
              }}
            >
              Upload Image
            </button>
          ) : (
            <span>Image limit reached ({newImages.length}/4)</span>
          )}
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
