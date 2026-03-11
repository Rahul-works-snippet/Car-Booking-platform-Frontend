'use client';

import Icon from '@/components/ui/AppIcon';

interface BookingStep {
  id: number;
  label: string;
  icon: string;
}

interface BookingProgressIndicatorProps {
  currentStep?: number;
  onStepClick?: (step: number) => void;
}

const steps: BookingStep[] = [
  { id: 1, label: 'Select Car', icon: 'TruckIcon' },
  { id: 2, label: 'Your Details', icon: 'UserIcon' },
  { id: 3, label: 'Review', icon: 'ClipboardDocumentCheckIcon' },
  { id: 4, label: 'Payment', icon: 'CreditCardIcon' },
  { id: 5, label: 'Confirmed', icon: 'CheckCircleIcon' },
];

const BookingProgressIndicator = ({
  currentStep = 1,
  onStepClick,
}: BookingProgressIndicatorProps) => {
  const getStepState = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="w-full bg-card border border-border rounded-automotive shadow-automotive-sm px-4 sm:px-6 py-4">
      {/* Mobile: compact */}
      <div className="flex sm:hidden items-center justify-between mb-2">
        <span className="text-xs font-caption font-medium text-muted-foreground uppercase tracking-wide">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-xs font-caption font-medium text-primary">
          {steps[currentStep - 1]?.label}
        </span>
      </div>
      <div className="flex sm:hidden h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-automotive duration-automotive"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Desktop: full steps */}
      <div className="hidden sm:flex items-center">
        {steps.map((step, index) => {
          const state = getStepState(step.id);
          const isClickable = state === 'completed' && !!onStepClick;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step node */}
              <button
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={`flex flex-col items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-automotive ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-label={`Step ${step.id}: ${step.label} - ${state}`}
                aria-current={state === 'active' ? 'step' : undefined}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-automotive duration-automotive ${
                    state === 'completed'
                      ? 'bg-success text-success-foreground shadow-automotive-sm'
                      : state === 'active' ?'bg-primary text-primary-foreground shadow-automotive ring-4 ring-primary/20' :'bg-muted text-muted-foreground'
                  }`}
                >
                  {state === 'completed' ? (
                    <Icon name="CheckIcon" size={18} variant="outline" />
                  ) : (
                    <Icon name={step.icon as any} size={18} variant="outline" />
                  )}
                </div>
                <span
                  className={`text-xs font-caption font-medium whitespace-nowrap transition-automotive duration-automotive ${
                    state === 'active' ?'text-primary'
                      : state === 'completed' ?'text-success' :'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-muted">
                  <div
                    className={`h-full rounded-full transition-automotive duration-automotive ${
                      getStepState(step.id + 1) !== 'upcoming' || step.id < currentStep ?'bg-success w-full'
                        : step.id === currentStep - 1
                        ? 'bg-primary w-full' :'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingProgressIndicator;