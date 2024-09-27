export interface IAddress {
    outside: boolean,
    address: string,
    latitude: number,
    longitude: number,
    id: string
}
export const addresses:IAddress[] = [
    {
        outside: false,
        address: '北京市北京市朝阳区运河北路高碑店乡',
        latitude: 39.9035949,
        longitude: 116.5083003,
        id:`北京市北京市朝阳区运河北路高碑店乡/39.9035949/116.5083003`
    },
    {
        outside: true,
        address: '中关村环保科技示范园（夏雪路）中国人寿科技园B座北',
        latitude: 40.062539,
        longitude: 116.171196,
        id:'中关村环保科技示范园（夏雪路）中国人寿科技园B座北/40.062539/116.171196'
    }
]