const removeDuplicates = (dataArray) => {
  const uniqueSet = new Set();
  return dataArray.filter((obj) => {
    const isUnique = !uniqueSet.has(obj.code);
    if (isUnique) {
      uniqueSet.add(obj.code);
    }
    return isUnique;
  });
};

export default removeDuplicates;
