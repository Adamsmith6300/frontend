// const { defineLocale } = require("moment");
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TextArea, Input, Button, Table } from "semantic-ui-react";
import { LargeLoader } from "../../loaders";
import {
  postNewProduct,
  getPresignedProductImgURL,
  postImageUpload,
} from "../../../store/helpers";
import ImageCarouselNewProd from "./imageCarouselNewProd";

const requiredFields = [
  "MerchantId",
  "title",
  "price",
  "description",
  "category",
  "images",
  "mainImage",
];

const index = ({ showNewProductForm, MerchantId }) => {
  const [initialOptions, setInitialOptions] = useState([]);
  const ProductId = uuidv4();
  const [formData, updateFormData] = useState({
    category: 0,
    MerchantId: MerchantId,
    options: [],
  });
  const [loading, setLoading] = useState(false);
  const [editAttr, setEditAttr] = useState(null);
  const [newOption, setNewOption] = useState({});
  // const [editedOption, setEditedOption] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  const clearState = () => {
    setEditAttr(null);
    // setNewOption(null);
    // setEditedOption(null);
    setDeleteIndex(null);
    updateFormData({ category: 0, MerchantId: MerchantId, options: [] });
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //   const handleOptionChange = (e, index, key) => {
  //     setEditedOption([
  //       index,
  //       { ...product.options[index], [key]: e.target.value.trim() },
  //     ]);
  //   };

  const handleNewOptionChange = (e, key) => {
    let newNewOption = { ...newOption, [key]: e.target.value };
    updateFormData({
      options: [...initialOptions, newNewOption],
    });
    setNewOption(newNewOption);
  };

  const addImagesToFormData = () => {
    formData["mainImage"] = mainImage;
    let images = [];
    for (let i = 0; i < newImages.length; ++i) {
      images.push(newImages[i].name);
    }
    formData["images"] = images;
  };

  const handleSubmit = async () => {
    setLoading(true);
    let resp = await postNewProduct(formData);
    if (resp.status == 200) {
      await uploadImages(resp.data.ProductId, newImages, imageSrcs);
      window.location.reload();
    }
  };

  const uploadImages = async (ProductId, newImages, imageSrcs) => {
    let failedImages = [];
    for (let i = 0; i < newImages.length; ++i) {
      try {
        let { data } = await getPresignedProductImgURL(
          {
            MerchantId: MerchantId,
            name: newImages[i].name,
          },
          ProductId
        );
        if (data) {
          let uploadImageResp = await postImageUpload(
            newImages[i].uploadFile,
            data
          );
          console.log(uploadImageResp);
        } else {
          throw { resp, file };
        }
      } catch (err) {
        console.log(err);
        failedImages.push(newImages[i].name);
        console.log("FAILED TO UPLOAD", newImages[i].name);
        // let resp = await updateProductDetails(ProductId, {
        //   images: images,
        //   MerchantId: MerchantId,
        // });
      }
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
    let optionsOk = true;
    if ("options" in formData) {
      for (let i = 0; i < formData.options.length; ++i) {
        if (
          !("label" in formData.options[i]) ||
          formData.options[i]["label"].length <= 0 ||
          formData.options[i]["label"] == null ||
          !("price" in formData.options[i]) ||
          formData.options[i]["price"].length <= 0 ||
          formData.options[i]["price"] == null
        ) {
          optionsOk = false;
          break;
        }
      }
    }
    return optionsOk;
  };

  let options = initialOptions.map((ogOption, index) => {
    const option = Object.assign({}, ogOption);
    return (
      <Table.Row key={index}>
        <>
          <Table.Cell negative={deleteIndex == index}>
            {option.label}
          </Table.Cell>
          <Table.Cell negative={deleteIndex == index}>
            ${option.price}
          </Table.Cell>
          <Table.Cell
            className="flex justify-between"
            negative={deleteIndex == index}
          >
            <span>
              <MdDelete
                onClick={() => {
                  console.log("delete", index);
                  initialOptions.splice(index, 1);
                }}
                className="inline cursor-pointer"
              />
            </span>
          </Table.Cell>
        </>
      </Table.Row>
    );
  });
  return loading ? (
    <LargeLoader />
  ) : (
    <div className="pl-2">
      <span
        className="cursor-pointer border px-4 py-1"
        onClick={() => showNewProductForm(false)}
      >
        Back
      </span>
      <div className="w-500 max-w-full mx-auto">
        <ImageCarouselNewProd
          mainImage={mainImage}
          setMainImage={setMainImage}
          newImages={newImages}
          setNewImages={setNewImages}
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
        />
        <div>
          <p className="text-2xl font-bold">Title:</p>
          <Input name="title" type="text" onChange={handleChange} />
        </div>
        <div>
          <p className="text-2xl font-bold">Price:</p>
          <Input name="price" type="number" onChange={handleChange} />
        </div>
        <div>
          <p className="text-2xl font-bold">Stock:</p>
          <Input name="stock" type="number" min="1" onChange={handleChange} />
        </div>
        <div>
          <p className="text-2xl font-bold">Description:</p>
          <TextArea
            className="w-full"
            name="description"
            onChange={handleChange}
          ></TextArea>
        </div>
        {/* <div>
          <p className="text-2xl font-bold">Options:</p>
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Label</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {options}
              <Table.Row>
                <>
                  <Table.Cell>
                    <Input
                      name="optionLabel"
                      value={newOption.label || ""}
                      type="text"
                      className="w-125"
                      onChange={(e) => handleNewOptionChange(e, "label")}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      name="optionPrice"
                      value={newOption.price || ""}
                      type="number"
                      className="w-75"
                      onChange={(e) => handleNewOptionChange(e, "price")}
                    />
                  </Table.Cell>
                  <Table.Cell className="flex justify-between">
                    <span className="">
                      <BsCheck
                        onClick={() => {
                          console.log("Save this option");
                          initialOptions.push(newOption);
                          setNewOption({});
                        }}
                        className="inline cursor-pointer"
                      />
                    </span>
                  </Table.Cell>
                </>
              </Table.Row>
            </Table.Body>
          </Table>
        </div> */}

        <div className="mt-2 w-full text-center">
          <Button
            onClick={() => {
              clearState();
            }}
            color="red"
          >
            Clear
          </Button>
          {readyToSave() ? (
            <Button onClick={() => handleSubmit()} color="green">
              Save
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default index;
