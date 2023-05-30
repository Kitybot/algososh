import { circleId } from '../src/constants/element-ids'

export const textInCircleSelector = `p[data-testid=${circleId}]`;
export const containerWithCircles = '#circlesContainer';

export const circlDefaultColor = 'rgb(0, 50, 255)';
export const circlChangingColor = 'rgb(210, 82, 225)';
export const circleModifiedColor = 'rgb(127, 224, 81)';

export const linkToFibonacci = 'a[href*="fibonacci"]';
export const linkToListPage = 'a[href*="list"]';
export const linkToQueuePage = 'a[href*="queue"]';
export const linkToString = 'a[href*="recursion"]';
export const linkToSortingPage = 'a[href*="sorting"]';
export const linkToStackPage = 'a[href*="stack"]';