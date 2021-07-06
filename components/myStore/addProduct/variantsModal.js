import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Variants from "./variants";
import Options from "./options";
import { roundToTwo } from "../../../store/helpers";

const index = ({ formData, updateFormData, closeModal, newImages }) => {
  const [step, setStep] = useState(
    formData["variants"].length > 0 ? "variants" : "options"
  );
  let ogOptions = formData["options"];
  // let ogVariants = formData["variants"];
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
          price: formData["price"] != null ? formData["price"] : 0,
          stock: formData["stock"] != null ? formData["stock"] : 0,
          stockUnlimited: true,
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
  const compareOptions = (o1, o2) => {
    if (o1.length != o2.length) return false;
    let matchCount = 0;
    for (let i = 0; i < o1.length; ++i) {
      for (let k = 0; k < o2.length; ++k) {
        if (o1[i].name == o2[k].name) {
          let duplicate = false;
          if (o1[i].values.length == o2[k].values.length) {
            let valMatchCount = 0;
            for (let j = 0; j < o1[i].values.length; ++j) {
              for (let l = 0; l < o2[k].values.length; ++l) {
                if (
                  o1[i].values[j].toLowerCase() == o2[k].values[l].toLowerCase()
                ) {
                  valMatchCount++;
                }
              }
            }
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
    let generatedVariants = [...generateVariants(options)];
    setNewVariants([...generatedVariants]);
    setStep("variants");
  };
  const saveVariants = () => {
    for (let i = 0; i < newVariants.length; ++i) {
      newVariants[i].price = roundToTwo(newVariants[i].price);
      newVariants[i].stock = parseInt(newVariants[i].stock);
    }
    console.log(newVariants);
    updateFormData({ ...formData, variants: [...newVariants] });
    closeModal();
  };

  let contents = (
    <Options
      newOptions={newOptions}
      setNewOptions={setNewOptions}
      error={error}
      saveOptions={saveOptions}
    />
  );
  if (step == "variants") {
    contents = (
      <Variants
        setStep={setStep}
        newVariants={newVariants}
        setNewVariants={setNewVariants}
        saveVariants={saveVariants}
        error={error}
        newImages={newImages}
      />
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
