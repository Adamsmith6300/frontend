import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "semantic-ui-react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
const index = ({ setNewOptions, newOptions, error, saveOptions }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
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
  let newOptionInputs = newOptions.map((val, index) => {
    let values = val.values.map((value, i) => {
      return (
        <span
          key={i + value}
          className="cursor-pointer border rounded-3xl bg-gray-300 p-1 px-2 m-1 place-items-center h-10 grid grid-cols-2"
        >
          {value}{" "}
          <AiFillCloseCircle
            onClick={() => {
              newOptions[index].values.splice(i, 1);
              forceUpdate();
            }}
            className="ml-1"
          />
        </span>
      );
    });
    return (
      <Table.Row key={val.id} className="">
        <>
          <Table.Cell
            verticalAlign="top"
            onClick={() => {
              setNewOptions(newOptions.filter((item) => item.id !== val.id));
            }}
            className="grid grid-cols-1 place-content-center text-red-400"
          >
            <RiDeleteBin2Line className="cursor-pointer mt-2" />
          </Table.Cell>
          <Table.Cell verticalAlign="top">
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
            verticalAlign="top"
            className={`${values.length > 0 ? "flex flex-wrap" : ""} min-w-200`}
          >
            {values}
            {values.length < 8 ? (
              <input
                className="h-10"
                name="optionValues"
                type="text"
                onChange={(e) => handleValueChange(e, index)}
              />
            ) : null}
          </Table.Cell>
        </>
      </Table.Row>
    );
  });
  return (
    <>
      <p className="text-3xl font-bold">Add Options</p>
      <p>Options allow you to create different variations of a product.</p>
      {newOptions.length <= 2 ? (
        <button
          onClick={() =>
            setNewOptions([
              ...newOptions,
              { id: uuidv4(), name: "", values: [] },
            ])
          }
          className="font-bold mt-2"
        >
          + Add Option ({newOptions.length}/3)
        </button>
      ) : (
        <p className="font-bold mt-2 text-xl">
          Option limit reached ({newOptions.length}/3)
        </p>
      )}
      <div className="variants-table">
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
      </div>
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
};

export default index;
