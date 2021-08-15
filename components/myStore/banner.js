import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "semantic-ui-react";
import { MdModeEdit } from "react-icons/md";
import { getPresignedBannerURL, postImageUpload } from "../../store/helpers";
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
      let { data } = await getPresignedBannerURL({
        MerchantId: MerchantId,
        name: bannerName,
      });
      if (data && uploadFile) {
        let postBannerResp = await postImageUpload(uploadFile, data);
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
            setBannerName(e.target.files[0].name.replace(/[^0-9a-z]/gi, ""));
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
        style={{
          backgroundImage: bannerImgURL,
        }}
        className="bg-img merchant--banner cursor-pointer"
        onClick={() => {
          bannerInput.current.click();
        }}
      />
      {!editing ? null : (
        <div className="w-full flex justify-center py-2">
          <button
            className="btn-no-size-color px-12 py-3 bg-green-600 mx-2"
            onClick={() => {
              setLoading(true);
              uploadBanner();
            }}
          >
            Save
          </button>
          <button
            className="btn-no-size-color px-8 py-3 bg-black mx-2"
            onClick={() => {
              setBannerUpload(bannerImgSrc);
              checkBannerExists();
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
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
