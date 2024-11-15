import { DocumentEditor } from "@onlyoffice/document-editor-react";

var onDocumentReady = function (event: any) {
    console.log("Document is loaded", event);
};

var onLoadComponentError = function (errorCode: any, errorDescription: any) {
    switch (errorCode) {
        case -1: // Unknown error loading component
            console.log(errorDescription);
            break;

        case -2: // Error load DocsAPI from http://documentserver/
            console.log(errorDescription);
            break;

        case -3: // DocsAPI is not defined
            console.log(errorDescription);
            break;
    }
};

const PreviewFile: React.FC<{
    url: string,
    type: 'docx' | 'pptx' | 'xlsx' | 'pdf'
}> = ({ url, type }) => {
    return (
        <div>
            <pre>
                <DocumentEditor
                    id="docxEditor"
                    documentServerUrl="http://120.46.196.120/"
                    config={{
                        "document": {
                            "fileType": type,
                            "key": "",
                            "title": "",
                            "url": url
                        },
                        "type": "mobile",
                        "editorConfig": {
                            mode: 'view'
                        }
                    }}
                    events_onDocumentReady={onDocumentReady}
                    onLoadComponentError={onLoadComponentError}
                />
            </pre>
        </div>
    )
}

export default PreviewFile