import { useState, useRef } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Input, Button } from "semantic-ui-react";
import { LargeLoader, MiniLoader } from "../loaders";
import {
  getPresignedProductImgURL,
  postImageUpload,
} from "../../store/helpers";

const index = ({
  baseImgPath,
  images,
  mainImageIndex,
  MerchantId,
  ProductId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(mainImageIndex);
  let imgSrc = `${baseImgPath}/${images[currentIndex]}`;
  const imageInput = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageUpload, setImageUpload] = useState(imgSrc);
  const [imageName, setImageName] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearState = () => {};

  const uploadImage = async () => {
    try {
      let { data } = await getPresignedProductImgURL(
        {
          MerchantId: MerchantId,
          name: imageName,
        },
        ProductId
      );
      console.log(data);
      // setLoading(false);
      if (data && uploadFile) {
        let uploadImageResp = await postImageUpload(uploadFile, data);
        console.log(uploadImageResp);
        setLoading(false);
        // window.location.reload();
      } else {
        throw { resp, file };
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  let imgURL = `url(${imageUpload})`;
  return (
    <>
      <input
        onChange={(e) => {
          if (FileReader && e.target.files && e.target.files.length) {
            var fileReader = new FileReader();
            fileReader.onloadend = () => {
              setImageUpload(fileReader.result);
            };
            setImageName(e.target.files[0].name);
            setUploadFile(e.target.files[0]);
            fileReader.readAsDataURL(e.target.files[0]);
            setUploading(true);
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
            backgroundImage: imgURL,
          }}
        ></div>
        <div>
          <Button
            color="grey"
            disabled={currentIndex == 0}
            onClick={() => {
              let newSrc = `${baseImgPath}/${
                images[Math.max(currentIndex - 1, 0)]
              }`;
              setImageUpload(newSrc);
              setCurrentIndex(Math.max(currentIndex - 1, 0));
            }}
          >
            Prev
          </Button>
          <Button
            disabled={currentIndex == images.length - 1}
            color="grey"
            onClick={() => {
              let newSrc = `${baseImgPath}/${
                images[Math.min(currentIndex + 1, images.length - 1)]
              }`;
              setImageUpload(newSrc);
              setCurrentIndex(Math.min(currentIndex + 1, images.length - 1));
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
        {uploading ? (
          <>
            <Button
              color="green"
              onClick={() => {
                setLoading(true);
                uploadImage();
              }}
            >
              Upload
            </Button>
            <Button
              color="red"
              onClick={() => {
                setImageUpload(imgSrc);
                setUploading(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            disabled={selectedImg == null}
            color={selectedImg == null ? "grey" : "red"}
          >
            <span className="mr-2">Delete Selected</span>
            <MdDelete className="inline cursor-pointer" />
          </Button>
        )}
      </div>
    </>
  );
};

export default index;
