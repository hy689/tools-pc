import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const App = () => {
  const docs = [
    // { uri: "http://tiantiankaixin.site/ppt200.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt600.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt800.pptx" }, // Remote file
    // { uri: "http://tiantiankaixin.site/pdf66.pdf" }, // Remote file
    // { uri: "http://tiantiankaixin.site/ppt3.pptx" }, // Remote file
    { uri: "https://szrz-uat.test.cgbchina.com.cn/gd/hrsaas/sso/static/%E6%95%B0%E4%BC%81%E9%80%9A%E4%BA%BA%E8%B5%84%E6%A8%A1%E5%9D%97%E9%85%8D%E7%BD%AE%E6%8C%87%E5%BC%95%E5%9C%BA%E6%99%AF.docx" }, // Remote file
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

export default App