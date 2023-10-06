import { defineFormKitConfig, createInput } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import myTailwindTheme from "./formkit-tailwind-theme";
import imageInput from "./custom/imageInput.vue";

export default defineFormKitConfig({
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
