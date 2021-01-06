import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "semantic-ui-react";
import { MdModeEdit } from "react-icons/md";
import { getPresignedBannerURL } from "../../store/helpers";
import { LargeLoader } from "../loaders";

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let croppedImage = new File([u8arr], filename, { type: mime });
  return croppedImage;
};

const index = ({ MerchantId, name }) => {
  let bannerImgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${MerchantId}/banner`;
  let bannerImgURL = `url(${bannerImgSrc})`;

  // reference to general image input
  const bannerInput = useRef(null);
  // src of uploaded image
  const [bannerUpload, setBannerUpload] = useState(bannerImgSrc);
  // src of react crop image
  const [croppedBannerUpload, setCroppedBannerUpload] = useState(null);
  // final url of cropped image
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

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
        getCroppedImg(croppedBannerUpload, crop);
      }
      //   const resp = await getPresignedBannerURL(MerchantId);
      //   console.log(resp);
      setEditing(false);
      setLoading(false);
      // if (resp.data) {
      //   await uploadAvatar(avatarUpload, resp.data);
      // }
    } catch (err) {
      setEditing(false);
      setLoading(false);
      console.log(err);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        // UPLOAD THIS TO S3
        console.log(dataURLtoFile(reader.result, "banner"));
      };
    });
  };

  return (
    <>
      <input
        onChange={(e) => {
          if (FileReader && e.target.files && e.target.files.length) {
            var fileReader = new FileReader();
            // fr.onload = function () {
            //   // set temp image
            //   // setProfileImgSrc(fr.result);
            // };
            // // console.log(e.target.files[0]);
            // // console.log(URL.createObjectURL(e.target.files[0]));
            // setBannerUpload(URL.createObjectURL(e.target.files[0]));
            // fr.readAsDataURL(e.target.files[0]);
            fileReader.onloadend = () => {
              setBannerUpload(fileReader.result);
            };
            console.log("FILE", e.target.files[0]);
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
