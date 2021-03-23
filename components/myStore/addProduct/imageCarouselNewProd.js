import { useState, useRef } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Button } from "semantic-ui-react";
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
  const defaultImg = `url(${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/no-image.png)`;
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  let imageSrcsReady = imageSrcs.length > 0;
  let imgURL = `url(${imageSrcsReady ? imageSrcs[currentIndex] : null})`;

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
        <div
          onClick={() =>
            setSelectedImg(selectedImg == currentIndex ? null : currentIndex)
          }
          className="myShop-product-image"
          style={{
            backgroundImage: !imageSrcsReady ? defaultImg : imgURL,
          }}
        ></div>
        <div>
          <Button
            color="grey"
            disabled={currentIndex == 0}
            onClick={() => {
              setCurrentIndex(Math.max(currentIndex - 1, 0));
              setSelectedImg(null);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={
              currentIndex == imageSrcs.length - 1 || imageSrcs.length == 0
            }
            color="grey"
            onClick={() => {
              setCurrentIndex(Math.min(currentIndex + 1, imageSrcs.length - 1));
              setSelectedImg(null);
            }}
          >
            Next
          </Button>
        </div>
        <Button
          color="black"
          onClick={() => {
            imageInput.current.click();
          }}
        >
          <span className="mr-2">Add Image</span>
          <BsPlusCircle className="inline cursor-pointer" />
        </Button>
        <Button
          disabled={selectedImg == null || imageSrcs.length == 1}
          color={selectedImg == null || imageSrcs.length == 1 ? "grey" : "red"}
          onClick={() => {
            const index = currentIndex;
            setCurrentIndex(0);
            deleteImage(index);
            setSelectedImg(null);
          }}
        >
          <span className="mr-2">Delete Selected</span>
          <MdDelete className="inline cursor-pointer" />
        </Button>
        <Button
          color="blue"
          disabled={selectedImg == null || imageSrcs.length == 1}
          onClick={() => {
            setMainImage(currentIndex);
          }}
        >
          <span className="mr-2">Set Main Image</span>
        </Button>
      </div>
    </>
  );
};

export default index;
