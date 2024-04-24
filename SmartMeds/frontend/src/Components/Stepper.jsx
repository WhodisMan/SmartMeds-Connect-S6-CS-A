import React, { useEffect, useState,useCallback } from "react";
import { TiTick } from "react-icons/ti";
import './Stepper.css'

const Stepper = ({onStepChange}) => {
  const steps = ["Placing Order", "Preparing your food", "On the way", "Delievered"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

   // Define the goToNextStep function using useCallback
   const goToNextStep = useCallback(() => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    onStepChange(nextStep); // Notify the parent component about the step change

    if (nextStep === steps.length) {
      setComplete(true);
    }
  }, [currentStep, onStepChange, steps.length]);

  //For showing how the stepper will be implemented with deleviry logistics
  useEffect(() => {
    if (complete) {
        return; // Stop the interval if complete is true
      }
    const interval = setInterval(goToNextStep, 3000); 
    console.log(interval)
    return () => {
      clearInterval(interval);
    };
  }, [goToNextStep,complete]);

  return (
    <>
      <div className="stepper d-flex justify-content-between pt-5">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={25} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {complete && (
        <div className="d-flex justify-content-center">
            <h4 style={{color:"coral"}}>Enjoy your food! :)</h4>
        </div>
      )}
    </>
  );
};

export default Stepper;