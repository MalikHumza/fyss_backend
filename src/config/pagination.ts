export const PAGINATION_CONFIG = {
  SKIP: 10,
  ITEM_PER_PAGE: 10,
};

//   export const ASSESSMENT_PAGINATION_CONFIG = {
//     SKIP: 15,
//     ITEM_PER_PAGE: 15,
//   };

export const getRemainingPageForDefaultConfig = (count: number) =>
  Math.ceil(count / PAGINATION_CONFIG.ITEM_PER_PAGE);
//   export const getRemainingPagesForAssessmentsConfig = (count: number) => Math.ceil(count / ASSESSMENT_PAGINATION_CONFIG.ITEM_PER_PAGE);
