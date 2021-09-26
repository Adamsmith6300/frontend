import { useState } from "react";
import Modal from "../../modal";
import VariantsModal from "./variantsModal";
import { postNewProduct, roundToTwo } from "../../../store/helpers";
import ImageCarouselNewProd from "./imageCarouselNewProd";
import { Radio, Dropdown } from "semantic-ui-react";

const requiredFields = [
  "MerchantId",
  "title",
  "price",
  "description",
  "category",
];

const index = ({
  showNewProductForm,
  MerchantId,
  callFetchMerchData,
  setLoading,
  storename,
  categories,
}) => {
  const [formData, updateFormData] = useState({
    category: 0,
    MerchantId: MerchantId,
    options: [],
    images: [],
    mainImage: 0,
    variants: [],
    stockUnlimited: true,
    storename: storename,
  });
  const [mainImage, setMainImage] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  categories = categories.map((cat, index) => {
    return {
      key: cat.name,
      text: cat.name,
      value: cat.CategoryIndex,
    };
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addImagesToFormData = () => {
    let images = [];
    for (let i = 0; i < newImages.length; ++i) {
      images.push(newImages[i].name);
    }
    formData["images"] = images;
  };

  const handleSubmit = async () => {
    setLoading(true);
    formData["price"] = roundToTwo(formData["price"]);
    for (let i = 0; i < formData["variants"].length; ++i) {
      if (formData["variants"][i]["price"] <= 0) {
        formData["variants"][i]["price"] = formData["price"];
      }
    }
    try {
      await postNewProduct(formData);
    } catch (err) {
      console.log(err);
    }
    callFetchMerchData();
  };

  let readyToSave = () => {
    addImagesToFormData();
    for (let i = 0; i < requiredFields.length; ++i) {
      if (!(requiredFields[i] in formData)) {
        return false;
      }
      if (formData[requiredFields[i]] == null) {
        return false;
      }
      if (Array.isArray(formData[requiredFields[i]])) {
        if (formData[requiredFields[i]].length < 1) return false;
      }
    }
    return true;
  };

  return (
    <div className="pl-2">
      <button
        className="btn-no-size-color bg-black px-6 py-2"
        onClick={() => showNewProductForm(false)}
      >
        Back
      </button>
      <div className="w-500 max-w-full mx-auto pt-12">
        <ImageCarouselNewProd
          mainImage={mainImage}
          setMainImage={setMainImage}
          newImages={newImages}
          setNewImages={setNewImages}
          MerchantId={MerchantId}
        />
        <div>
          <p className="text-2xl font-bold">Title:</p>
          <input
            maxLength="60"
            className="w-full my-3 h-10"
            name="title"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div>
          <p className="text-2xl font-bold">Price:</p>
          <input
            className="w-full my-3 h-10"
            name="price"
            type="number"
            step="1.00"
            min="1"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <p className="text-2xl font-bold">Stock:</p>
          <p className="flex justify-between my-3">
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
            maxlength="1200"
            className="w-full my-3 h-24"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold">
            {formData["variants"].length} Variants
          </p>
          <button className="my-3" onClick={() => setShowModal(true)}>
            Edit Variants
          </button>
        </div>
        <div>
          <p className="text-2xl font-bold">Category:</p>
          <Dropdown
            className="w-full my-3"
            selection
            placeholder="Select a Category"
            options={categories}
            onChange={(e, { value }) => {
              updateFormData({
                ...formData,
                category: value,
              });
            }}
            value={formData["category"]}
          />
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
            onClick={() => showNewProductForm(false)}
            className="btn-no-size-color bg-black px-6 py-2 mr-2"
          >
            Cancel
          </button>
          {readyToSave() && newImages.length > 0 ? (
            <button
              onClick={() => handleSubmit()}
              className="btn-no-size-color bg-green-500 px-6 py-2 ml-2"
            >
              Save
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default index;
