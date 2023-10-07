export default function defaultToEmptyString(node: FormKitNode) {
  node.hook.input((value, next) => {
    if (
      value === undefined ||
      value === null ||
      value === "null" ||
      value === "undefined"
    )
      return next("");
    return next(value);
  });
}
