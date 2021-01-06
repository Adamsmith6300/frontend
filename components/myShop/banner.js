import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "semantic-ui-react";
import { MdModeEdit } from "react-icons/md";
import { getPresignedBannerURL, postBannerUpload } from "../../store/helpers";
import { dataURLtoFile, getCroppedImg } from "../componentHelpers";
import { LargeLoader } from "../loaders";

const index = ({ MerchantId, name }) => {
  let bannerImgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${MerchantId}/banner`;
  let bannerImgURL = `url(${bannerImgSrc})`;

  // reference to general image input
  const bannerInput = useRef(null);
  // src of uploaded image
  const [bannerUpload, setBannerUpload] = useState(bannerImgSrc);
  // src of react crop image
  const [croppedBannerUpload, setCroppedBannerUpload] = useState(null);
  // final File of cropped image
  const [croppedImageFile, setCroppedImageFile] = useState(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 800,
    height: 450,
  });

  const uploadBanner = async () => {
    try {
      if (croppedBannerUpload && crop.width && crop.height) {
        const reader = new FileReader();
        let canvas = getCroppedImg(croppedBannerUpload, crop);
        canvas.toBlob((blob) => {
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            let file = dataURLtoFile(reader.result, "banner");
            const resp = await getPresignedBannerURL(MerchantId);
            console.log("Presigned", resp);
            // UPLOAD THIS TO S3
            console.log("File", file);
            if (resp.data && file) {
              await postBannerUpload(file, resp.data);
            } else {
              throw { resp, file };
            }
            setEditing(false);
            setLoading(false);
          };
        });
      }
    } catch (err) {
      setEditing(false);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <input
        onChange={(e) => {
          if (FileReader && e.target.files && e.target.files.length) {
            var fileReader = new FileReader();
            fileReader.onloadend = () => {
              setBannerUpload(fileReader.result);
            };
            fileReader.readAsDataURL(e.target.files[0]);
            setEditing(true);
          } else {
            console.log("No file reader");
          }
        }}
        type="file"
        id="bannerInput"
        ref={bannerInput}
        style={{ display: "none" }}
      />

      {loading ? (
        <LargeLoader />
      ) : !editing ? (
        <div
          style={{
            backgroundPosition: "center",
            bakcgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: bannerImgURL,
            height: "470px",
            borderRadius: "10px",
            marginBottom: "20px",
            padding: "30px",
            position: "relative",
          }}
        >
          <h2 className="w-full">{name}</h2>

          <Button
            className="edit-banner-btn inverted"
            onClick={() => {
              bannerInput.current.click();
            }}
          >
            <span className="mr-2 ">Edit</span>
            <MdModeEdit className="inline cursor-pointer" />
          </Button>
        </div>
      ) : (
        <>
          <ReactCrop
            src={bannerUpload}
            crop={crop}
            onImageLoaded={(image) => setCroppedBannerUpload(image)}
            onChange={(newCrop) =>
              setCrop({ ...newCrop, unit: "px", width: 800, height: 450 })
            }
          />
          <div className="my-2 mb-4">
            <Button
              className="teal"
              onClick={() => {
                setLoading(true);
                uploadBanner();
              }}
            >
              <span className="">Save</span>
            </Button>
            <Button
              className="red inverted"
              onClick={() => {
                setEditing(false);
              }}
            >
              <span className="mr-2">Cancel</span>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default index;
