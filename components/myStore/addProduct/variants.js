import { useState, useReducer } from "react";
import { Table, Radio } from "semantic-ui-react";
import { RiDeleteBin2Line } from "react-icons/ri";
import ImageSelect from "./imageSelect";

const index = ({
  newVariants,
  setNewVariants,
  saveVariants,
  error,
  newImages,
  setStep,
}) => {
  const [selectImage, setSelectImage] = useState(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handleVariantChange = (e, index, key) => {
    newVariants[index][key] = e.target.value;
  };
  let newVariantInputs = newVariants.map((val, index) => {
    let values = val.optionValues.map((value, i) => {
      return (
        <span
          key={i + value}
          className="border rounded-3xl bg-gray-300 p-1 px-3 mx-1 inline h-10"
        >
          {value.value}
        </span>
      );
    });
    return (
      <Table.Row key={val.id}>
        <Table.Cell
          onClick={() => {
            setNewVariants(newVariants.filter((item) => item.id !== val.id));
          }}
          className="grid grid-cols-1 place-content-center m-3 text-red-400"
        >
          <RiDeleteBin2Line className="cursor-pointer" />
        </Table.Cell>
        <Table.Cell>
          {val.image == null ? (
            <button onClick={() => setSelectImage(index)}>select image</button>
          ) : (
            <img className="w-100" src={val.image.src} />
          )}
        </Table.Cell>
        <Table.Cell>{values}</Table.Cell>
        <Table.Cell>
          <Radio
            onChange={(e) => {
              newVariants[index]["stockUnlimited"] =
                !newVariants[index]["stockUnlimited"];
              forceUpdate();
            }}
            defaultChecked={newVariants[index]["stockUnlimited"]}
            toggle
          />
        </Table.Cell>
        <Table.Cell className="">
          {val.stockUnlimited ? (
            <span>Unlimited</span>
          ) : (
            <input
              disabled={val.stockUnlimited}
              className="h-10"
              name="stock"
              type="number"
              min="1"
              defaultValue={val.stock}
              onChange={(e) => handleVariantChange(e, index, "stock")}
            />
          )}
        </Table.Cell>
        <Table.Cell>
          <input
            className="h-10 inline"
            name="price"
            type="number"
            min="1"
            step="1.00"
            defaultValue={val.price}
            onChange={(e) => handleVariantChange(e, index, "price")}
          />
        </Table.Cell>
      </Table.Row>
    );
  });

  if (selectImage != null)
    return (
      <ImageSelect
        newImages={newImages}
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        newVariants={newVariants}
      />
    );
  return (
    <>
      <p className="text-3xl font-bold">Edit Variants</p>
      <div className="variants-table">
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Variation</Table.HeaderCell>
              <Table.HeaderCell>Unlimited Stock</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{newVariantInputs}</Table.Body>
        </Table>
      </div>
      {error != null && error.step == "variants" ? (
        <p className="text-red-400">{error.value}</p>
      ) : null}
      <div className="text-center">
        <button
          className="mx-2 btn-no-size-color bg-black px-6 py-2"
          onClick={() => setStep("options")}
        >
          Edit Options
        </button>
        {newVariants.length > 0 ? (
          <button
            className="mx-2 btn-no-size-color bg-green-500 px-6 py-2"
            onClick={() => saveVariants()}
          >
            Save
          </button>
        ) : null}
      </div>
    </>
  );
};

export default index;
