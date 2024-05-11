import React, { useState, useRef, useEffect } from "react";

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef]);

  if (!stepsConfig) return;

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, idx) => (
          <div
            key={idx}
            ref={(el) => (stepRef.current[idx] = el)}
            className={`step
             ${currentStep > idx + 1 || isComplete ? "complete" : ""} 
            ${currentStep === idx + 1 ? "active" : ""}`}
          >
            <div className="step-number">
              {currentStep > idx + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                idx + 1
              )}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{
              width: `${calculateProgressBarWidth()}%`,
            }}
          ></div>
        </div>
      </div>

      <b>
        <ActiveComponent />
      </b>

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep !== stepsConfig.length ? "Next" : "Finish"}
        </button>
      )}
    </>
  );
};

export default Stepper;
