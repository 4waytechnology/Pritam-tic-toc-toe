export function intersection(setA: number[], setB: number[]) {
  let _intersection: number[] = [];
  for (let elem of setB) {
    if (setA.includes(elem)) {
      _intersection.push(elem);
    }
  }
  return _intersection;
}
