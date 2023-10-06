const castToNumber = (node: FormKitNode) => {
  node.hook.input((value, next) => next(Number(value)));
};

export default castToNumber;
