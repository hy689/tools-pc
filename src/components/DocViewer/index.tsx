import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const App = () => {
  const docs = [
    { uri: "http://tiantiankaixin.site/ppt200.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt600.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt800.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/pdf66.pdf" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt3.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/word.docx" }, // Remote file
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

export default App