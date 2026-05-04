import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogActions,
} from "../../atoms/Dialog";
import { Text } from "../../atoms/Text";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";

const DotIndicator: React.FC<{
  steps: OnboardStep[];
  current: number;
  setStep?: (step: number) => void;
}> = ({ steps, current, setStep }) => (
  <div className="flex gap-2 mt-4">
    {steps.map((_, idx) => (
      <button
        key={idx}
        type="button"
        className={cn(
          idx === current
            ? "inline-block w-6 h-3 rounded-full bg-primary transition-all focus:outline-none"
            : "inline-block w-3 h-3 rounded-full bg-neutral-200 transition-all focus:outline-none",
          setStep ? "cursor-pointer" : "cursor-default"
        )}
        onClick={() => setStep && setStep(idx)}
        aria-label={`Go to step ${idx + 1}`}
        tabIndex={setStep ? 0 : -1}
        disabled={!setStep}
      />
    ))}
  </div>
);

export interface OnboardStep {
  title: string;
  description: string;
}

export interface OnboardDialogProps {
  steps: OnboardStep[];
  isOpen: boolean;
  onClose: () => void;
  onFinish?: () => void;
  onSkip?: () => void;
  // For Storybook/demo only
  _step?: number;
  _setStep?: (step: number) => void;
}

const OnboardDialog: React.FC<OnboardDialogProps> = ({
  steps,
  isOpen = false,
  onClose,
  onFinish,
  onSkip,
  _step,
  _setStep,
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const step = _step !== undefined ? _step : internalStep;
  const setStep = _setStep || setInternalStep;
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish?.();
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    onSkip?.();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg">
      <DialogTitle>
        <Text variant="h4">{steps[step].title}</Text>
      </DialogTitle>
      <DialogBody>
        <Text variant="body1" className="my-3">
          {steps[step].description}
        </Text>
      </DialogBody>
      <DialogActions>
        <div className="flex justify-between w-full">
          <DotIndicator steps={steps} current={step} setStep={_setStep || setInternalStep} />
          <div>
            {step > 0 && !isLast && (
              <Button variant="ghost" onClick={handleSkip} type="button">
                Lewati
              </Button>
            )}
            {!isLast ? (
              <Button onClick={handleNext} type="button">
                Berikutnya
              </Button>
            ) : (
              <Button onClick={handleSkip} type="button">
                Tutup
              </Button>
            )}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardDialog;
