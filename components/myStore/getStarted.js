import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";

const index = ({ myShop, showGetStarted }) => {
  let steps = [
    {
      step: "Step 1",
      details:
        "Start by uploading your own banner image. You can do this by clicking the image above.",
    },
    {
      step: "Step 2",
      details:
        "Edit the 'About' section of your listing, so visitors can learn a bit about your brand.",
    },
    {
      step: "Step 3",
      details:
        "Import your first products by clicking the import button at the bottom of the page and following the steps presented.",
    },
    {
      step: "Step 4",
      details:
        "That's it! When you're happy with your listing, click the 'CHANGE' button next to your listing status and request approval of your listing. Once approved you will receive an email notification and your listing will go live.",
    },
  ];
  steps = steps.map((step, index) => {
    return (
      <li key={step.step} className="my-4 flex">
        <span className="text-2xl font-bold w-100">{step.step}</span>
        <span className="text-2xl w-full sm:w-300">{step.details}</span>
      </li>
    );
  });

  return (
    <div className="grid place-items-start w-full shadow-lg border p-6">
      <p className="text-3xl font-bold">Welcome to Loma!</p>
      <p className="my-2">Follow these steps to get started...</p>
      <ul>{steps}</ul>
      <button
        className="btn-no-size-color px-8 py-3 bg-black"
        onClick={(e) => {
          e.stopPropagation();
          showGetStarted(false);
        }}
      >
        Dismiss
      </button>
    </div>
  );
};

export default index;
