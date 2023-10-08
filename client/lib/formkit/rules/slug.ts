const slug = async (node: FormKitNode, url: string) => {
  if ((node.value as string).includes(" ")) {
    return false;
  } else {
    return true;
  }
};

// override default rule behaviors for your custom rule
// uniqueEmail.blocking = false;
// uniqueEmail.skipEmpty = false;
//   unique.debounce = 500; // milliseconds
// uniqueEmail.force = true;

export default slug;
