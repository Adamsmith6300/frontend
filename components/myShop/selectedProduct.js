// const { defineLocale } = require("moment");
import { useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import { TextArea, Input, Button, Table } from "semantic-ui-react";
import { LargeLoader } from "../loaders";
import { updateProductDetails } from "../../store/helpers";

const index = ({ product, setSelectedProduct, callFetchMerchData }) => {
  // console.log(product.options);
  const initialOptionsCount = product.options.length;
  const [formData, updateFormData] = useState({});
  const [editAttr, setEditAttr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newOption, setNewOption] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const handleChange = (e) => {
    updateFormData({
      // ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleOptionChange = (e, index, key) => {
    product.options[index][key] = e.target.value.trim();
    updateFormData({
      options: product.options,
    });
  };
  const handleNewOptionChange = (e, key) => {
    let newNewOption = { ...newOption, [key]: e.target.value.trim() };
    updateFormData({
      options: [...product.options, newNewOption],
    });
    setNewOption(newNewOption);
  };
  const deleteOption = (index) => {
    setDeleteIndex(index);
    product.options.splice(index, 1);
    updateFormData({
      options: product.options,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let resp = await updateProductDetails(product.ProductId, {
      ...formData,
      MerchantId: product.MerchantId,
    });
    if (resp.status == 200) {
      callFetchMerchData().then((response) => {
        setEditAttr(null);
        setNewOption(null);
        setDeleteIndex(null);
        updateFormData({});
        setLoading(false);
      });
    } else {
      console.log("ERROR! Failed to update shop details");
      window.location.reload();
    }
  };

  const imgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
    product.MerchantId
  }/products/${
    product.ProductId.length > 36
      ? product.ProductId.substring(2)
      : product.ProductId
  }/${product.images[product.mainImage]}`;

  let options = product.options.map((option, index) => {
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
                    updateFormData({});
                    setEditAttr(3 + index);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
              <span>
                <MdDelete
                  onClick={() => {
                    updateFormData({});
                    deleteOption(index);
                  }}
                  className="inline cursor-pointer"
                />
              </span>
            </Table.Cell>
          </>
        )}
      </Table.Row>
    );
  });

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
        <img
          className="w-350 max-w-full mt-2"
          src={imgSrc}
          alt=""
          align="top"
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
                            updateFormData({});
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
                setNewOption(null);
                setEditAttr(null);
                setDeleteIndex(null);
                updateFormData({});
              }}
              color="red"
            >
              Cancel
            </Button>
            {Object.keys(formData).length > 0 ? (
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
