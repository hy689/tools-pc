import axios from "../utils/request"

interface IQueryEmployeeReq {

}
interface IQueryEmployeeRes {
    compId: number;
    empName: string;
    mobile: string;
}
export const apiQueryEmployee = (data: IQueryEmployeeReq) => {
    return axios<IQueryEmployeeReq, IQueryEmployeeRes>({
        url: '/api/attend/mobile/sign/queryEmployee',
        method: 'POST',
        data
    })
}

interface ILoginReq {
    account: string;
    device: string
    loginWay: string
    merchantId?: string
    otpToken?: string
    password: string
}
export const apiLogin = (data: ILoginReq) => {
    return axios<ILoginReq, string>({
        url: '/api/merchant/platform/login',
        method: 'POST',
        data
    })
}

interface IRenewTokenReq {
    merchantId: string
}

interface IRenewTokenRes {
    token: string
}
export const apiRenewToken = (data: IRenewTokenReq) => {
    return axios<IRenewTokenReq, IRenewTokenRes>({
        url: '/api/merchant/platform/renewToken',
        method: 'POST',
        data
    })
}

interface IPlatformProfileReq {

}
export interface IPlatformProfileRes {
    joinedMerchant: {
        merchant: {
            id: number;
            name: string;
        }
    }[],
    user: {
        realName: string;
    },
    merchant: {
        name: string,
        id: number
    }
}
export const apiPlatformProfile = (data: IPlatformProfileReq) => {
    return axios<IPlatformProfileReq, IPlatformProfileRes>({
        url: '/api/merchant/platform/profile',
        method: 'POST',
        data
    })
}

// 获取考勤信息
interface IQueryAttendanceGroupReq {
    coId: number
}
export interface ITodaySignList {
    attendId: number;
    attendWorkingShiftId: number;
    coId: number;
    signType: string;
    workingShiftDetailId: number;
    signResult: string;
    createdTime: string;
    recordAddress: string;
    longitude: number;
    latitude: number;
    signDescription: string;
}
export interface IQueryAttendanceGroupRes {
    attendGroup: {
        attendId: number,
    },
    currentSignVo?: {
        signTypeEnum: string
        workingShiftDetailId: number
        workingShiftId: number
    },
    todaySignList?: ITodaySignList[]
}
export const apiQueryAttendanceGroup = (data: IQueryAttendanceGroupReq) => {
    return axios<IQueryAttendanceGroupReq, IQueryAttendanceGroupRes>({
        url: '/api/attend/mobile/sign/queryAttendanceGroup',
        method: 'POST',
        data
    })
}

// 打卡
export interface IDoSignReq {
    workingShiftId: number;
    workingShiftDetailId: number;
    signTime: string;
    signType: string;
    status: string;
    signDescription?: string;
    longitude: number;
    latitude: number;
    attendId: number;
    recordAddress: string;
    coId: number;
}
interface IDoSignRes {

}
export const apiDoSign = (data: IDoSignReq) => {
    return axios<IDoSignReq, IDoSignRes>({
        url: '/api/attend/mobile/sign/doSign',
        method: 'POST',
        data
    })
}
