import { Button, Card, Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { apiDoSign, apiQueryAttendanceGroup, IDoSignReq, IQueryAttendanceGroupRes, ITodaySignList } from '../../../api'
import dayjs from 'dayjs'
import './index.css'
import { IAddress } from '../../../constants/attend.ts'
import ChangeAddress from './components/ChangeAddress'
import generateRandomCoordinates from '../../../utils/generate-random-coordinates'
import MapDialog from './components/CustomizeAddressDialog/index.tsx'
import { storeAddresses } from '../../../utils/store-addresses.ts'
import { useStore } from '../../../store/context/index.tsx'

export default function Attend() {
  const changeAddressRef = useRef<any>(null);
  const mapDialogRef = useRef<any>(null);

  const {profile} = useStore()
  const [attend, setAttend] = useState<IQueryAttendanceGroupRes>({
    attendGroup: {
      attendId: 0,
    }
  })

  const [address, setAddress] = useState<IAddress>({
    outside: true,
    address: '中关村环保科技示范园（夏雪路）中国人寿科技园B座北',
    latitude: 40.062539,
    longitude: 116.171196,
    id: '中关村环保科技示范园（夏雪路）中国人寿科技园B座北/40.062539/116.171196'
  })

  const customizeAddress = (value: { address: string, latitude: number, longitude: number }) => {
    const newAddress = {
      ...address,
      ...value,
      id: `${value.address}/${value.latitude}/${value.longitude}`
    }
    setAddress(newAddress)

    storeAddresses(newAddress)
  }

  const updateCheckInTime = async (checkIn: ITodaySignList) => {
    console.log(checkIn, 'adsjflasdjflksajdflkjsdf')
    const body: IDoSignReq = {
      workingShiftDetailId: checkIn.workingShiftDetailId,
      workingShiftId: checkIn.attendWorkingShiftId,
      signTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      signType: checkIn.signType,
      status: checkIn.signResult,
      signDescription: checkIn.signDescription,
      longitude: checkIn.longitude,
      latitude: checkIn.latitude,
      recordAddress: checkIn.recordAddress,
      attendId: checkIn.attendId,
      coId: checkIn.coId,
    }

    doCheckIn(body)
  }

  const doSign = async () => {

    const body: IDoSignReq = {
      workingShiftDetailId: attend.currentSignVo?.workingShiftDetailId as number,
      workingShiftId: attend.currentSignVo?.workingShiftId as number,
      signTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      signType: attend.currentSignVo?.signTypeEnum as string,
      status: address.outside ? 'OUTSIDE_ATTEND' : 'NORMAL',
      signDescription: address.outside ? '出差':'',
      longitude: address.longitude,
      latitude: address.latitude,
      recordAddress: address.address,
      attendId: attend.attendGroup.attendId,
      coId: profile.merchant.id,
    }
    doCheckIn(body)
  }

  const doCheckIn = async (body: IDoSignReq) => {
    const { latitude, longitude } = generateRandomCoordinates(body.latitude, body.longitude)
    const r = await apiDoSign({
      ...body,
      latitude,
      longitude
    })

    if (!r.success) {
      Toast.show({
        icon: 'fail',
        content: r.message
      })
      return
    }

    Toast.show({
      icon: 'success',
      content: '打卡成功'
    })

    queryAttendanceGroup()
  }

  const queryAttendanceGroup = async () => {

    const r2 = await apiQueryAttendanceGroup({
      coId: profile.merchant.id,
    })
    if (!r2.success) {
      Toast.show({
        icon: 'fail',
        content: r2.message
      })
      return
    }

    setAttend(r2.data)

  }

  useEffect(() => {
    queryAttendanceGroup()
  }, [])
  return (
    <div className='attend'>
      <h3>{profile.merchant.name}  {profile.user.realName}</h3>
      {
        attend.todaySignList?.length && <>
          <h1>今日已打卡</h1>
          {attend.todaySignList.map((item, index) => {
            return <Card className='attend-card' key={index} title={item.signType === 'TO_WORK' ? '上班打卡' : '下班打卡'}>
              <div>
                打卡时间: {item.createdTime}
              </div>
              <div>
                打卡位置：{item.recordAddress || '无打卡位置'}
              </div>
              {
                item.signType === 'FROM_WORK' &&
                <div className='attend-card-footer' >
                  <Button color='primary' onClick={() => updateCheckInTime(item)}>更新打卡时间</Button>
                </div>
              }
            </Card>
          })}
        </>
      }
      {attend.currentSignVo &&
        <>
          <h1>今日未打卡</h1>
          <Card className='attend-card' title={attend.currentSignVo &&attend.currentSignVo.signTypeEnum === 'TO_WORK' ? '上班打卡' : '下班打卡'}>
            <div>
              当前打卡位置：{address.address}
            </div>
            <div >
              <Button style={{ marginRight: '20px' }} color='primary' onClick={changeAddressRef.current?.open}>修改打卡位置</Button>
              {/* <Button color='primary' onClick={ ()=>{console.log('打开弹出',mapDialogRef.current); mapDialogRef.current?.open()}}>地图自己选</Button> */}

            </div>
            {
              <div className='attend-card-footer' >
                <Button color='primary' onClick={doSign}>打卡</Button>
              </div>
            }
          </Card>
        </>
      }
      <ChangeAddress ref={changeAddressRef} addressId={address.id} setAddress={setAddress} />
      <MapDialog ref={mapDialogRef} setAddress={customizeAddress} />
    </div>
  )
}