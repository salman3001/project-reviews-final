import { boot } from 'quasar/wrappers';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const colors = [
  'red',
  'yellow',
  'black',
  'brown',
  'green',
  'grey',
  'white',
  'blue',
  'yellow',
  'orange',
];

const globalOptions = {
  debug: 'info',
  formats: [
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'script', // superscript and subscript
    'blockquote',
    'code',
    'header', // heading 1 to 6
    'indent', // indentation
    'list', // bullet and ordered list
    'align', // text alignment
    'direction', // text direction
    'code-block',
    'formula', // mathematical formula
    'image', // embedded images
    'video', // embedded videos
    'color', // text color
    'background', // background color
    'size',
  ],
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      // ['script'],
      ['blockquote', 'code'],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['direction'],
      ['code-block'],
      ['formula'],
      ['image'],
      ['video'],
      [{ color: [...colors] }, { background: [...colors] }],
      ['size'],
    ],
  },
  placeholder: 'Type here...',
  theme: 'snow',
};

QuillEditor.props.globalOptions.default = () => globalOptions;

export default boot(({ app }) => {
  app.component('QuillEditor', QuillEditor);
});
