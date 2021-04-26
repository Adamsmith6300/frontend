// const { defineLocale } = require("moment");
import { useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import { TextArea, Input, Button, Table } from "semantic-ui-react";
import { LargeLoader } from "../../loaders";
import { updateProductDetails } from "../../../store/helpers";
import ImageCarouselProd from "./imageCarouselProd";

const index = ({ product, setSelectedProduct, callFetchMerchData }) => {
  const initialOptionsCount = product.options.length;
  const initialOptions = [...product.options];
  const [formData, updateFormData] = useState({});
  const [editAttr, setEditAttr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newOption, setNewOption] = useState(null);
  const [editedOption, setEditedOption] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const clearState = () => {
    setEditAttr(null);
    setNewOption(null);
    setEditedOption(null);
    setDeleteIndex(null);
    updateFormData({});
  };

  const handleChange = (e) => {
    updateFormData({
      // ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleOptionChange = (e, index, key) => {
    setEditedOption([
      index,
      { ...product.options[index], [key]: e.target.value.trim() },
    ]);
  };

  const handleNewOptionChange = (e, key) => {
    let newNewOption = { ...newOption, [key]: e.target.value.trim() };
    updateFormData({
      options: [...product.options, newNewOption],
    });
    setNewOption(newNewOption);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let data = formData;
    if (deleteIndex != null) {
      product.options.splice(deleteIndex, 1);
      data = {
        options: product.options,
      };
    }
    if (editedOption != null) {
      product.options[editedOption[0]] = editedOption[1];
      data = {
        options: product.options,
      };
    }
    let resp = await updateProductDetails(product.ProductId, {
      ...data,
      MerchantId: product.MerchantId,
    });
    if (resp.status == 200) {
      callFetchMerchData().then((response) => {
        clearState();
        setLoading(false);
      });
    } else {
      console.log("ERROR! Failed to update shop details");
      window.location.reload();
    }
  };

  const readyToSave = () => {
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
    return (
      (Object.keys(formData).length > 0 ||
        deleteIndex != null ||
        editedOption != null) &&
      optionsOk
    );
  };

  const imgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
    product.MerchantId
  }/products/${
    product.ProductId.length > 36
      ? product.ProductId.substring(2)
      : product.ProductId
  }/${product.images[product.mainImage]}`;

  const options = initialOptions.map((ogOption, index) => {
    const option = Object.assign({}, ogOption);
    return (
      <Table.Row key={index}>
        {editAttr == 3 + index ? (
          <>
            <Table.Cell>
              <Input
                defaultValue={option.label}
                name="optionLabel"
                type="text"
                className="w-125"
                onChange={(e) => handleOptionChange(e, index, "label")}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                defaultValue={option.price}
                name="optionPrice"
                type="number"
                className="w-75"
                onChange={(e) => handleOptionChange(e, index, "price")}
              />
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </>
        ) : (
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
              <span className="">
                <MdModeEdit
                  onClick={() => {
                    clearState();
                    setEditAttr(3 + index);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
              {deleteIndex != index ? (
                <span>
                  <MdDelete
                    onClick={() => {
                      clearState();
                      setDeleteIndex(index);
                    }}
                    className="inline cursor-pointer"
                  />
                </span>
              ) : null}
            </Table.Cell>
          </>
        )}
      </Table.Row>
    );
  });
  const baseImgPath = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${product.MerchantId}/products/${product.ProductId}`;

  return loading ? (
    <LargeLoader />
  ) : (
    <div className="pl-2">
      <span
        className="cursor-pointer border px-4 py-1"
        onClick={() => setSelectedProduct(null)}
      >
        Back
      </span>
      <div className="w-500 max-w-full mx-auto">
        <ImageCarouselProd
          baseImgPath={baseImgPath}
          images={product.images}
          mainImageIndex={product.mainImage}
          MerchantId={product.MerchantId}
          ProductId={product.ProductId}
        />
        <div>
          <p className="text-2xl font-bold">Title:</p>
          {editAttr == 0 ? (
            <Input
              defaultValue={product.title}
              name="title"
              type="text"
              onChange={handleChange}
            />
          ) : (
            <p>
              {product.title}
              <span>
                <MdModeEdit
                  onClick={() => {
                    updateFormData({});
                    setDeleteIndex(null);
                    setEditedOption(null);
                    setEditAttr(0);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
            </p>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold">Price:</p>
          {editAttr == 1 ? (
            <Input
              defaultValue={product.price}
              name="price"
              type="number"
              onChange={handleChange}
            />
          ) : (
            <p>
              {product.price}
              <span>
                <MdModeEdit
                  onClick={() => {
                    updateFormData({});
                    setDeleteIndex(null);
                    setEditedOption(null);
                    setEditAttr(1);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
            </p>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold">Description:</p>
          {editAttr == 2 ? (
            <TextArea
              className="w-full"
              name="description"
              onChange={handleChange}
            >
              {product.description}
            </TextArea>
          ) : (
            <p>
              {product.description}
              <span>
                <MdModeEdit
                  onClick={() => {
                    updateFormData({});
                    setDeleteIndex(null);
                    setEditedOption(null);
                    setEditAttr(2);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
            </p>
          )}
        </div>
        <div>
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
                {editAttr == "newOption" ? (
                  <>
                    <Table.Cell>
                      <Input
                        name="optionLabel"
                        type="text"
                        className="w-125"
                        onChange={(e) => handleNewOptionChange(e, "label")}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        name="optionPrice"
                        type="number"
                        className="w-75"
                        onChange={(e) => handleNewOptionChange(e, "price")}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </>
                ) : (
                  <>
                    {initialOptionsCount >= 5 ? null : (
                      <Table.Cell>
                        <span className="mr-2">Add Option</span>
                        <BsPlusCircle
                          onClick={() => {
                            clearState();
                            setEditAttr("newOption");
                          }}
                          className="inline cursor-pointer"
                        />
                      </Table.Cell>
                    )}
                  </>
                )}
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        {editAttr != null || deleteIndex != null ? (
          <div className="mt-2 w-full text-center">
            <Button
              onClick={() => {
                clearState();
              }}
              color="red"
            >
              Cancel
            </Button>
            {readyToSave() ? (
              <Button onClick={() => handleSubmit()} color="green">
                Save
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default index;
