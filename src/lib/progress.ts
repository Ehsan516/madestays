import {
  OnboardingData,
  OnboardingStepDefinition,
  Property,
  PropertyProgress,
  PropertyStep,
} from "./types";

// lines up a property's steps with the master list of 10 steps, in order.
// if a property is missing one (Kingsgate has none at all) we just treat
// it as not_started instead of leaving it out - keeps every checklist the
// same length which makes the UI way simpler
export function resolveSteps(
  property: Property,
  definitions: OnboardingStepDefinition[]
): { definition: OnboardingStepDefinition; step: PropertyStep }[] {
  const byId = new Map(property.steps.map((s) => [s.id, s]));
  return [...definitions]
    .sort((a, b) => a.order - b.order)
    .map((definition) => ({
      definition,
      step: byId.get(definition.id) ?? { id: definition.id, status: "not_started" },
    }));
}

export function computeProgress(
  property: Property,
  definitions: OnboardingStepDefinition[]
): PropertyProgress {
  const resolved = resolveSteps(property, definitions);
  const totalSteps = resolved.length;
  const completedSteps = resolved.filter((r) => r.step.status === "complete").length;
  const actionRequiredSteps = resolved
    .filter((r) => r.step.status === "action_required")
    .map((r) => r.step);
  const anyMovement = resolved.some((r) => r.step.status !== "not_started");

  let stage: PropertyProgress["stage"];
  if (completedSteps === totalSteps) {
    stage = "live";
  } else if (actionRequiredSteps.length > 0) {
    stage = "needs_attention";
  } else if (anyMovement) {
    stage = "in_progress";
  } else {
    stage = "not_started";
  }

  // property counts as overdue if the target date has already passed and
  // its not live yet. not using a library for the date compare, just
  // zeroing out the time so "today" doesnt accidentally count as overdue
  // (TODO: this is using the browser's local time, probably fine for now)
  const targetDate = new Date(property.targetGoLiveDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = stage !== "live" && !Number.isNaN(targetDate.getTime()) && targetDate < today;

  return {
    property,
    totalSteps,
    completedSteps,
    actionRequiredSteps,
    percentComplete: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
    stage,
    isOverdue,
  };
}

export function computeAllProgress(data: OnboardingData): PropertyProgress[] {
  return data.properties.map((p) => computeProgress(p, data.onboardingStepDefinitions));
}

export interface PortfolioStats {
  totalProperties: number;
  liveCount: number;
  needsAttentionCount: number;
  inProgressCount: number;
  notStartedCount: number;
  overallPercentComplete: number;
}

export function computePortfolioStats(all: PropertyProgress[]): PortfolioStats {
  const totalProperties = all.length;
  const liveCount = all.filter((p) => p.stage === "live").length;
  const needsAttentionCount = all.filter((p) => p.stage === "needs_attention").length;
  const inProgressCount = all.filter((p) => p.stage === "in_progress").length;
  const notStartedCount = all.filter((p) => p.stage === "not_started").length;

  const totalStepsAcrossPortfolio = all.reduce((sum, p) => sum + p.totalSteps, 0);
  const completedStepsAcrossPortfolio = all.reduce((sum, p) => sum + p.completedSteps, 0);
  const overallPercentComplete =
    totalStepsAcrossPortfolio === 0
      ? 0
      : Math.round((completedStepsAcrossPortfolio / totalStepsAcrossPortfolio) * 100);

  return {
    totalProperties,
    liveCount,
    needsAttentionCount,
    inProgressCount,
    notStartedCount,
    overallPercentComplete,
  };
}
