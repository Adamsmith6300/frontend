import { useState, useReducer } from "react";
import { TextArea, Input, Button, Table } from "semantic-ui-react";
import { postNewProduct } from "../../../store/helpers";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const index = ({ formData, updateFormData, closeModal }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [step, setStep] = useState(
    formData["variants"].length > 0 ? "variants" : "options"
  );
  let ogOptions = formData["options"];
  let ogVariants = formData["variants"];
  const [error, setError] = useState(null);
  const [newOptions, setNewOptions] = useState([...formData["options"]]);
  const [newVariants, setNewVariants] = useState([...formData["variants"]]);
  const generateVariants = (options) => {
    const generatePermutations = (options, result, depth, current) => {
      if (depth == options.length) {
        let optionsValues = current.split("_");
        let variant = {
          id: uuidv4(),
          image: null,
          optionValues: [],
          price: formData["price"] != null ? formData["price"] : "0",
          stock: formData["stock"] != null ? formData["stock"] : "0",
          unlimited: false,
        };

        for (let j = 0; j < optionsValues.length; ++j) {
          if (optionsValues[j].length > 0) {
            let option = {};
            let nameVal = optionsValues[j].split(":");
            option["name"] = nameVal[0];
            option["value"] = nameVal[1];
            variant["optionValues"].push(option);
          }
        }
        result.push(variant);
        return;
      }

      for (let i = 0; i < options[depth]["values"].length; i++) {
        generatePermutations(
          options,
          result,
          depth + 1,
          current +
            "_" +
            options[depth]["name"] +
            ":" +
            options[depth]["values"][i]
        );
      }
    };
    let result = [];
    generatePermutations(options, result, 0, "");
    return result;
  };
  const compareVariants = (v1, v2) => {
    for (let i = 0; i < v1.optionValues.length; ++i) {
      for (let j = 0; j < v2.optionValues.length; ++j) {
        let val1 = v1.optionValues[i];
        let val2 = v2.optionValues[j];
        if (val1.name == val2.name && val1.value == val2.value) {
          return true;
        }
      }
    }
    return false;
  };
  const compareOptions = (o1, o2) => {
    if (o1.length != o2.length) return false;
    let matchCount = 0;
    for (let i = 0; i < o1.length; ++i) {
      for (let k = 0; k < o2.length; ++k) {
        // console.log(o1[i].name);
        // console.log(o2[k].name);
        if (o1[i].name == o2[k].name) {
          let duplicate = false;
          if (o1[i].values.length == o2[k].values.length) {
            let valMatchCount = 0;
            for (let j = 0; j < o1[i].values.length; ++j) {
              for (let l = 0; l < o2[k].values.length; ++l) {
                console.log(o1[i].values[j].toLowerCase());
                console.log(o2[k].values[l].toLowerCase());
                if (
                  o1[i].values[j].toLowerCase() == o2[k].values[l].toLowerCase()
                ) {
                  valMatchCount++;
                }
              }
            }
            console.log("valMatch", valMatchCount);
            if (valMatchCount == o1[i].values.length) {
              duplicate = true;
            }
          } else {
            return false;
          }
          if (duplicate) {
            matchCount++;
          }
        }
      }
    }
    console.log(matchCount);
    return matchCount == o1.length;
  };
  const saveOptions = () => {
    let options = [];
    for (let i = 0; i < newOptions.length; ++i) {
      let option = newOptions[i];
      if (option.name.length <= 0 || option.values.length <= 0) {
        setError({
          step: "options",
          value: "Must complete or delete empty options.",
        });
        return;
      }
      for (let k = i + 1; k < newOptions.length; ++k) {
        if (
          newOptions[i].name.toLowerCase() == newOptions[k].name.toLowerCase()
        ) {
          setError({
            step: "options",
            value: "Options must not have duplicate names.",
          });
          return;
        }
      }
      options.push(option);
    }
    setNewOptions(options);
    updateFormData({ ...formData, options: [...options] });
    if (compareOptions(options, ogOptions)) {
      setStep("variants");
      return;
    }
    // let variants = [...newVariants];
    let generatedVariants = [...generateVariants(options)];
    // for (let i = 0; i < generatedVariants.length; ++i) {
    //   let variant = generatedVariants[i];
    //   let duplicate = false;
    //   for (let k = 0; k < variants.length; ++k) {
    //     if (compareVariants(variant, variants[k])) {
    //       duplicate = true;
    //       break;
    //     }
    //   }
    //   if (!duplicate) {
    //     variants.push(variant);
    //   }
    // }
    setNewVariants([...generatedVariants]);
    setStep("variants");
  };
  const saveVariants = () => {
    updateFormData({ ...formData, variants: [...newVariants] });
    closeModal();
  };
  const handleValueChange = (e, index) => {
    let val = e.target.value;
    if (val[val.length - 1] == ",") {
      val = val.split(",")[0].trim();
      if (val.length > 0) {
        newOptions[index].values = [...newOptions[index].values, val];
      }
      e.target.value = "";
    }
    forceUpdate();
  };
  const handleVariantChange = (e, index, key) => {
    newVariants[index][key] = e.target.value;
    // setNewVariants()
  };

  let newOptionInputs = newOptions.map((val, index) => {
    let values = val.values.map((value, index) => {
      return (
        <span
          key={index + value}
          className="border rounded-3xl bg-gray-300 p-1 px-2 mx-1 inline place-items-center h-10 grid grid-cols-2"
        >
          {value} <AiFillCloseCircle className="ml-1" />
        </span>
      );
    });
    return (
      <Table.Row key={val.id}>
        <>
          <Table.Cell
            onClick={() => {
              setNewOptions(newOptions.filter((item) => item.id !== val.id));
            }}
            className="grid grid-cols-1 place-content-center m-3 text-red-400"
          >
            <RiDeleteBin2Line className="cursor-pointer" />
          </Table.Cell>
          <Table.Cell className="">
            <input
              className="h-10"
              onChange={(e) => {
                let val = e.target.value;
                newOptions[index].name = val.trim();
              }}
              name="optionName"
              defaultValue={newOptions[index].name}
              type="text"
            />
          </Table.Cell>
          <Table.Cell
            className={`${values.length > 0 ? "flex flex-wrap " : ""} "w-150"`}
          >
            {values}
            <input
              className="h-10 inline"
              name="optionValues"
              type="text"
              onChange={(e) => handleValueChange(e, index)}
            />
          </Table.Cell>
        </>
      </Table.Row>
    );
  });
  let contents = (
    <>
      <p className="text-3xl font-bold">Add Options</p>
      <p>Options allow you to create different variations of a product.</p>
      <button
        onClick={() =>
          setNewOptions([...newOptions, { id: uuidv4(), name: "", values: [] }])
        }
        className="font-bold mt-2"
      >
        + Add Option
      </button>
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Values (separate by commas)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{newOptionInputs}</Table.Body>
      </Table>
      {error != null && error.step == "options" ? (
        <p className="text-red-400">{error.value}</p>
      ) : null}
      {newOptions.length > 0 ? (
        <div className="text-center">
          <button
            className="btn-no-size-color bg-green-500 px-6 py-2"
            onClick={() => saveOptions()}
          >
            Save
          </button>
        </div>
      ) : null}
    </>
  );
  if (step == "variants") {
    let newVariantInputs = newVariants.map((val, index) => {
      let values = val.optionValues.map((value, index) => {
        return (
          <span
            key={index + value}
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
          <Table.Cell>select image</Table.Cell>
          <Table.Cell>{values}</Table.Cell>
          <Table.Cell className="">
            <input
              className="h-10"
              name="stock"
              type="number"
              min="1"
              defaultValue={val.stock}
              onChange={(e) => handleVariantChange(e, index, "stock")}
            />
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
    contents = (
      <>
        <p className="text-3xl font-bold">Edit Variants</p>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Variation</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{newVariantInputs}</Table.Body>
        </Table>
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
  }
  return contents;
};

export default index;

/*
options: [
  {name: "color",values: ["blue", "red", "green"]},
  {name: "size",values: ["sm", "md", "lg", "xl"]},
  {name: "shape",values: ["round", "square"]},
],
for(let i = 0; i < options[0]['values'].length; ++i){
    for(let j = 1; j < options.length; ++j){
        let values = options[j].values;
        for(let k = 0; k < values.length; ++k){
        
        }
    }
}
variants: [
  {
  id: uuid,
  image: {
    index: 0,
    src: ""
  },
  optionValues: [
    {
    name: color,
    value: red
    }
  ],
  price: $$,
  stock: 5,
  unlimited: false

  }
]
*/
