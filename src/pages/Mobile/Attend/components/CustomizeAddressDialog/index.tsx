import { Modal, SearchBar, Toast } from "antd-mobile"
import { forwardRef, useImperativeHandle, useState } from "react"
import { debounce } from '../../../../../utils'

import './index.css'
import { key } from "../../../../../constants"

interface IAddress {
  location: {
    lat: number,
    lng: number
  },
  address: string,
  id: string
}

const MapDialog = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [addresses, setAddresses] = useState<IAddress[]>([])

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setActiveId('')
    setAddresses([])
  }

  const onChange = debounce((val: string) => {
    onSearch(val)
  }, 1500)

  const onSearch = async (val: string) => {
    const poiText = val;
    const pageSize = 20;
    const output = "jsonp"
    const pageIndex = 1;
    const apiKey = key;

    const url = `https://apis.map.qq.com/ws/place/v1/suggestion?output=${output}&keyword=${encodeURIComponent(poiText)}&page_size=${pageSize}&page_index=${pageIndex}&key=${apiKey}&callback=handleResponse`;

    // 创建一个全局回调函数
    (window as any).handleResponse = (data: any) => {
      if (data.message !== 'query ok') {
        Toast.show({
          icon: 'fail',
          content: JSON.stringify(data)
        })
        return
      }

      console.log(addresses, 'handleResponsehandleResponsehandleResponse');
      setAddresses(data.data)
      delete (window as any).handleResponse;
    };

    // 创建一个 script 标签并添加到 document
    const script = document.createElement('script');
    script.src = url;

    document.body.appendChild(script);
  }

  const selectAddress = (val: IAddress) => {
    setActiveId(val.id)
  }

  const confirm = () => {
    const address = addresses.find((item) => item.id === activeId)
    props.setAddress({
      address: address?.address,
      latitude: address?.location.lat,
      longitude: address?.location.lng
    })

    close()
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))

  return (
    <>
      <Modal
        bodyClassName="map-dialog"
        visible={visible}
        content={
          <div >
            <SearchBar placeholder="输入地址" onSearch={onSearch} onChange={onChange} />
            {addresses.length > 0 && (
              <div className='map-dialog-search-result'>
                {
                  addresses.map((item) => {
                    return <div key={item.id} style={{ color: activeId === item.id ? '#1890ff' : '' }} onClick={() => selectAddress(item)} className='map-dialog-search-item'>
                      {item.address}
                    </div>
                  })
                }
              </div>

            )}
          </div>}
        closeOnAction
        onClose={close}
        actions={[
          {
            key: 'confirm',
            text: '我知道了',
            onClick: confirm
          },
          {
            key: 'cancel',
            text: '取消',
            onClick: close
          },
        ]}
      /></>
  )
}

export default forwardRef(MapDialog)