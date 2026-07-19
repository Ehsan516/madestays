import rawData from "@/data/onboarding-data.json";
import { OnboardingData } from "./types";

const DATA = rawData as OnboardingData;

/**
 * until actuall API call, brief asked to simulate short delay , 400 felt long enough
 */
export function fetchOnboardingData(): Promise<OnboardingData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DATA), 400);
  });
}
