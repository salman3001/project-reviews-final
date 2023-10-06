import { defineFormKitConfig, createInput } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import myTailwindTheme from "./formkit-tailwind-theme";
import imageInput from "./custom/imageInput.vue";
import uniqueEmial from "~/lib/formkit/rules/UniqueEmail";
import toEmptyString from "~/lib/formkit/plugins/defaultToEmptyString";

export default defineFormKitConfig({
  plugins: [toEmptyString],
  rules: {
    uniqueEmial,
  },
  icons: {
    ...genesisIcons,
  },
  inputs: {
    image: createInput(imageInput, {
      props: ["url"],
    }),
  },
  config: {
    classes: generateClasses(myTailwindTheme),
  },
});
