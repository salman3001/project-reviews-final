import { defineFormKitConfig, createInput } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import myTailwindTheme from "./formkit-tailwind-theme";
import imageInput from "./custom/imageInput.vue";
import unique from "~/lib/formkit/rules/unique";
import slug from "~/lib/formkit/rules/slug";
import toEmptyString from "~/lib/formkit/plugins/defaultToEmptyString";

export default defineFormKitConfig({
  plugins: [toEmptyString],
  rules: {
    unique,
    slug,
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
