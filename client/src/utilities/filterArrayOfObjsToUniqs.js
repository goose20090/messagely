/** @format */

export function filterArrayOfObjsToUniqs(objArray) {
  let uniqueObjArray = [
    ...new Map(objArray.map((item) => [item["id"], item])).values(),
  ];
  return uniqueObjArray;
}
