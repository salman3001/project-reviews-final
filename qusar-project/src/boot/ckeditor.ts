import { boot } from 'quasar/wrappers';
import CKEditor from '@mayasabha/ckeditor4-vue3';

export default boot(({ app }) => {
  app.use(CKEditor);
});
