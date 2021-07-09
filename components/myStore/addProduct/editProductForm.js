import { useState } from "react";
import Modal from "../../modal";
import VariantsModal from "./variantsModal";
import { updateProductDetails, roundToTwo } from "../../../store/helpers";
import ImageCarouselEditProd from "./imageCarouselNewProd";
import { Radio } from "semantic-ui-react";

const requiredFields = [
  "MerchantId",
  "title",
  "price",
  "description",
  "category",
];

const index = ({
  setSelectedProduct,
  product,
  callFetchMerchData,
  setLoading,
}) => {
  const [formData, updateFormData] = useState({
    ...product,
  });
  const [mainImage, setMainImage] = useState(0);
  const [newImages, setNewImages] = useState([...product.images]);
  const [imageSrcs, setImageSrcs] = useState(
    product.images.map((img, index) => {
      return img.src;
    })
  );
  const [showModal, setShowModal] = useState(false);

  const handleChange = async (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const addImagesToFormData = () => {
    // formData["mainImage"] = mainImage;
    formData["images"] = [];
    let images = [];
    for (let i = 0; i < newImages.length; ++i) {
      images.push({
        src:
          process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL +
          "/" +
          product["MerchantId"] +
          "/products/" +
          newImages[i].name,
        name: newImages[i].name,
      });
    }
    formData["images"] = images;
  };

  const handleSubmit = async () => {
    setLoading(true);
    let ready = readyToSave();
    if (ready) {
      formData["price"] = roundToTwo(formData["price"]);
      await updateProductDetails(product.ProductId, formData);
      callFetchMerchData();
    }
  };

  const readyToSave = () => {
    //CHECK THAT ALL FIELDS ARE FILLED
    addImagesToFormData();
    for (let i = 0; i < requiredFields.length; ++i) {
      if (!(requiredFields[i] in formData)) return false;
      if (
        formData[requiredFields[i]] == null ||
        formData[requiredFields[i]].length < 1
      )
        return false;
    }
    return true;
  };

  return (
    <div className="pl-2">
      <button
        className="btn-no-size-color bg-black px-6 py-2"
        onClick={() => setSelectedProduct(null)}
      >
        Back
      </button>
      <div className="w-500 max-w-full mx-auto pt-12">
        <ImageCarouselEditProd
          mainImage={mainImage}
          setMainImage={setMainImage}
          newImages={newImages}
          setNewImages={setNewImages}
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          MerchantId={product["MerchantId"]}
        />
        <div>
          <p className="text-2xl font-bold">Title:</p>
          <input
            className="w-full my-3 h-10"
            name="title"
            maxLength="40"
            type="text"
            defaultValue={product.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold">Price:</p>
          <input
            className="w-full my-3 h-10"
            name="price"
            step="1.00"
            defaultValue={product.price}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold">Stock:</p>
          <p className="flex justify-between">
            <span>Unlimited</span>
            <Radio
              onChange={(e) => {
                console.log(e);
                updateFormData({
                  ...formData,
                  stockUnlimited: !formData["stockUnlimited"],
                });
              }}
              defaultChecked
              toggle
            />
          </p>
          {!formData["stockUnlimited"] ? (
            <input
              className="w-full my-3 h-10"
              name="stock"
              type="number"
              step="1"
              min="1"
              onChange={handleChange}
            />
          ) : null}
        </div>
        <div>
          <p className="text-2xl font-bold">Description:</p>
          <textarea
            className="w-full my-3 h-24"
            name="description"
            maxlength="500"
            defaultValue={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold">
            {formData["variants"].length} Variants
          </p>
          <button onClick={() => setShowModal(true)}>Edit Variants</button>
        </div>
        {showModal ? (
          <Modal
            close={() => {
              setShowModal(false);
            }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <svg width="23" height="23" viewBox="0 0 23 23">
                  <path
                    d="M 3 16.5 L 17 2.5"
                    fill="transparent"
                    strokeWidth="2"
                    stroke="hsl(0, 0%, 0%)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 3 2.5 L 17 16.346"
                    fill="transparent"
                    strokeWidth="2"
                    stroke="hsl(0, 0%, 0%)"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <VariantsModal
              formData={formData}
              updateFormData={updateFormData}
              closeModal={() => setShowModal(false)}
              newImages={newImages}
            />
          </Modal>
        ) : null}
        <div className="mt-2 w-full text-center">
          <button
            onClick={() => setSelectedProduct(null)}
            className="btn-no-size-color bg-black px-6 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className="btn-no-size-color bg-green-500 px-6 py-2 ml-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
