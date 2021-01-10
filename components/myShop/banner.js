import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "semantic-ui-react";
import { MdModeEdit } from "react-icons/md";
import { getPresignedBannerURL, postBannerUpload } from "../../store/helpers";
import { dataURLtoFile, getCroppedImg } from "../componentHelpers";
import { LargeLoader } from "../loaders";

const index = ({ MerchantId, name, bannerImageName }) => {
  let bannerImgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${MerchantId}/${bannerImageName}`;

  // reference to general image input
  const bannerInput = useRef(null);
  // src of uploaded image
  const [bannerUpload, setBannerUpload] = useState(bannerImgSrc);
  // src of react crop image
  const [croppedBannerUpload, setCroppedBannerUpload] = useState(null);
  // final File of cropped image
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  //filename for upload
  const [bannerName, setBannerName] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 800,
    height: 450,
  });

  function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = url;
  }

  const checkBannerExists = () => {
    imageExists(bannerUpload, function (exists) {
      if (!exists) {
        let sampleBanner = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/sampleBanner`;
        setBannerUpload(sampleBanner);
      }
    });
  };
  checkBannerExists();

  const uploadBanner = async () => {
    try {
      // if (croppedBannerUpload && crop.width && crop.height) {
      //   const reader = new FileReader();
      //   let canvas = getCroppedImg(croppedBannerUpload, crop);
      //   canvas.toBlob((blob) => {
      //     reader.readAsDataURL(blob);
      //     reader.onloadend = async () => {
      //       let file = dataURLtoFile(reader.result, bannerName);
      //       let resp = await getPresignedBannerURL({
      //         MerchantId: MerchantId,
      //         name: bannerName,
      //       });
      //       console.log("Presigned", resp);
      //       // UPLOAD THIS TO S3
      //       console.log("File", file);
      //       if (resp.data && file) {
      //         let postBannerResp = await postBannerUpload(file, resp.data);
      //         console.log(postBannerResp);
      //         window.location.reload();
      //       } else {
      //         throw { resp, file };
      //       }
      //     };
      //   });
      // }
      let { data } = await getPresignedBannerURL({
        MerchantId: MerchantId,
        name: bannerName,
      });
      if (data && uploadFile) {
        let postBannerResp = await postBannerUpload(uploadFile, data);
        console.log(postBannerResp);
        setEditing(false);
        setLoading(false);
        // window.location.reload();
      } else {
        throw { resp, file };
      }
    } catch (err) {
      setEditing(false);
      setLoading(false);
      console.log(err);
    }
  };

  let bannerImgURL = `url(${bannerUpload})`;

  return (
    <>
      <input
        onChange={(e) => {
          if (FileReader && e.target.files && e.target.files.length) {
            var fileReader = new FileReader();
            fileReader.onloadend = () => {
              setBannerUpload(fileReader.result);
            };
            setBannerName(e.target.files[0].name);
            setUploadFile(e.target.files[0]);
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

      {loading ? <LargeLoader /> : null}
      <div
        className="myShop-banner"
        style={{
          backgroundImage: bannerImgURL,
        }}
      >
        <h2 className="w-full">{name}</h2>
        {!editing ? (
          <Button
            className="edit-banner-btn inverted"
            onClick={() => {
              bannerInput.current.click();
            }}
          >
            <span className="mr-2 ">Edit</span>
            <MdModeEdit className="inline cursor-pointer" />
          </Button>
        ) : (
          <div className="save-banner-btns">
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
                setBannerUpload(bannerImgSrc);
                checkBannerExists();
                setEditing(false);
              }}
            >
              <span className="mr-2">Cancel</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default index;

// <>
//   <ReactCrop
//     src={bannerUpload}
//     crop={crop}
//     onImageLoaded={(image) => setCroppedBannerUpload(image)}
//     onChange={(newCrop) =>
//       setCrop({ ...newCrop, unit: "px", width: 800, height: 450 })
//     }
//   />
//   <div className="my-2 mb-4">
//     <Button
//       className="teal"
//       onClick={() => {
//         setLoading(true);
//         uploadBanner();
//       }}
//     >
//       <span className="">Save</span>
//     </Button>
//     <Button
//       className="red inverted"
//       onClick={() => {
//         setBannerUpload(bannerImgSrc);
//         checkBannerExists();
//         setEditing(false);
//       }}
//     >
//       <span className="mr-2">Cancel</span>
//     </Button>
//   </div>
// </>
