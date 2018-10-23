export function makeArray(obj) {
  let res = [];
  for (let i = 0, len = obj.length; i < len; i++) {
    res.push(obj[i]);
  }
  return res;
}

