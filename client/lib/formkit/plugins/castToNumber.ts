const castToNumber = (node: FormKitNode) => {
  node.hook.input((value, next) => {
    if (value === null || value === undefined || value === 0) {
      return next("");
    } else {
      return next(Number(value));
    }
  });
};

export default castToNumber;
