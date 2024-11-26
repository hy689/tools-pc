
import {init} from 'pptx-preview'
import { useEffect } from 'react'



const PreviewFile: React.FC<{
    url: string,
    type: 'docx' | 'pptx' | 'xlsx' | 'pdf'
}> = ({ }) => {
    //调用库的init方法生成一个预览器
    useEffect(() => {
        let pptxPrviewer = init(document.getElementById('pptx-wrapper'), {
            width: 960,
            height: 540
        })
        
        //获取文件或者读取文件，获取文件的 ArrayBuffer格式数据，传给组件进行预览
        fetch('/ppt200.pptx').then(response=>{
            return response.arrayBuffer()
        }).then(res =>{
            //调用预览器的preview方法
            pptxPrviewer.preview(res)
        })
    })
    return (
        <div>
           <div id='pptx-wrapper'>

           </div>
        </div>
    )
}

export default PreviewFile