import React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';
import { Divider } from '../../atoms/Divider';

export type StepStatus = 'completed' | 'active' | 'pending';
export type StepperVariant = 'default' | 'simple';

export interface StepProps {
  label: string;
  description?: React.ReactNode | string;
  icon?: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: StepProps[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  variant?: StepperVariant;
}

const getStepIconByStatus = (status: StepStatus, customIcon?: string) => {
  if (customIcon) return customIcon;
  switch (status) {
    case 'completed':
      return 'mdi:check';
    case 'active':
      return 'mdi:circle-medium';
    default:
      return 'mdi:circle-outline';
  }
};

const getStepColorByStatus = (status: StepStatus) => {
  switch (status) {
    case 'completed':
      return 'text-white bg-primary ring-4 ring-primary-50';
    case 'active':
      return 'text-primary bg-primary-50 ring-4 ring-primary-50';
    default:
      return 'text-neutral bg-neutral-50 ring-4 ring-neutral-50';
  }
};

const HorizontalStepper: React.FC<Omit<StepperProps, 'orientation'>> = ({
  steps,
  activeStep,
  className,
  variant = 'default',
}) => {
  return (
    <div className={cn('flex flex-row items-center w-full justify-between', className)}>
      {steps.map((step, index) => {
        const status: StepStatus =
          index < activeStep
            ? 'completed'
            : index === activeStep
            ? 'active'
            : 'pending';

        return (
          <div
            key={index}
            className="flex items-center flex-1"
          >
            <div className={cn(
              "flex flex-col items-center z-10",
              variant === 'default' ? 'gap-4' : 'gap-2',
              variant === 'default' ? 'px-5' : 'px-3'
            )}>
              {variant === 'default' && (
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                    getStepColorByStatus(status)
                  )}
                >
                  <Icon
                    icon={getStepIconByStatus(status, step.icon)}
                    className="h-5 w-5"
                  />
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    'text-sm font-medium',
                    status === 'active'
                      ? 'text-primary'
                      : status === 'completed'
                      ? 'text-neutral-900'
                      : 'text-neutral'
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-neutral">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <Divider
                className={cn(
                  'transition-all duration-200',
                  index < activeStep ? 'bg-primary' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const VerticalStepper: React.FC<Omit<StepperProps, 'orientation'>> = ({
  steps,
  activeStep,
  className,
  variant = 'default',
}) => {
  return (
    <div className={cn('flex flex-col items-start gap-8', className)}>
      {steps.map((step, index) => {
        const status: StepStatus =
          index < activeStep
            ? 'completed'
            : index === activeStep
            ? 'active'
            : 'pending';

        return (
          <div
            key={index}
            className="flex flex-row w-full items-center relative"
          >
            <div className={cn(
              "flex flex-row items-center z-10",
              variant === 'default' ? 'gap-4' : 'gap-2'
            )}>
              {variant === 'default' && (
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                    getStepColorByStatus(status)
                  )}
                >
                  <Icon
                    icon={getStepIconByStatus(status, step.icon)}
                    className="h-5 w-5"
                  />
                </div>
              )}
              <div className="flex flex-col items-start">
                <span
                  className={cn(
                    'text-sm font-medium',
                    status === 'active'
                      ? 'text-primary00'
                      : status === 'completed'
                      ? 'text-neutral-900'
                      : 'text-neutral'
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-neutral">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute transition-all duration-200',
                  variant === 'default' 
                    ? 'left-4 w-[1px] top-10 bottom-[-24px]'
                    : 'left-0 w-[1px] top-6 bottom-[-24px]',
                  index < activeStep ? 'bg-primary' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Stepper: React.FC<StepperProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  ...props
}) => {
  if (orientation === 'vertical') {
    return <VerticalStepper variant={variant} {...props} />;
  }

  return <HorizontalStepper variant={variant} {...props} />;
};
