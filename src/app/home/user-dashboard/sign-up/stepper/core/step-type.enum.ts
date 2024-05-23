export enum StepType {
  CHOOSE_CATEGORY = 'chooseCategory',
  CHOOSE_SCHOOL = 'chooseSchool',
  CHOOSE_COURSE = 'chooseCourse',
  CITY_SEARCH = 'citySearch',
}

export function getStepTypesForCitySearch(): StepType[] {
  return [StepType.CHOOSE_CATEGORY, StepType.CHOOSE_SCHOOL];
}
