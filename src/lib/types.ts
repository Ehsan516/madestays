// Status values as they  appear in data. The dataset' own statusLegend documents four of them . "on_hold" also appears on one
// property but isn't defined anywhere
export type StepStatus =
  | "complete"
  | "in_progress"
  | "action_required"
  | "not_started"
  | "on_hold"
  | (string & {});

export interface OnboardingStepDefinition {
  id: string;
  label: string;
  order: number;
}

export interface PropertyStep {
  id: string;
  status: StepStatus;
  note?: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  image: string;
  targetGoLiveDate: string;
  steps: PropertyStep[];
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  accountManager: string;
}

export interface OnboardingData {
  owner: Owner;
  onboardingStepDefinitions: OnboardingStepDefinition[];
  statusLegend: Record<string, string>;
  properties: Property[];
}

//derived, per-property progress
export interface PropertyProgress {
  property: Property;
  totalSteps: number;
  completedSteps: number;
  actionRequiredSteps: PropertyStep[];
  percentComplete: number; // 0-100, rounded
  stage: "live" | "needs_attention" | "in_progress" | "not_started";
  isOverdue: boolean; // went past targetGoLiveDate and still not live
}

export type FilterKey = "all" | "needs_attention" | "in_progress" | "live" | "not_started";
