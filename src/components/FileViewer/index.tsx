import FileViewer from 'react-file-viewer';

const FileView: React.FC<{
    file: string
}> = ( file) => {


    const handleError = (error:any) => {
        console.error('文件加载错误:', error);
      };

  const handleOnClose = () => {
   
  };

//   var index = file.lastIndexOf(".");
//   var type = file.substr(index + 1);

  return (
    <div>
      <div className="top">
        <div className="all">
          <div className="allname">
            <div className="topall">
           
            </div>
            {/* 使用这个组件 */}
            {/* <FileViewer
              fileType='pdf'
              filePath='http://tiantiankaixin.site/pdf66.pdf'
              onError={handleError}

            /> */}
            {/* <FileViewer
              fileType='docx'
              filePath='http://tiantiankaixin.site/123456.docx'
              onError={handleError}

            /> */}
            <FileViewer
              fileType='pptx'
              filePath='http://tiantiankaixin.site/ppt3.pptx'
              onError={handleError}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileView