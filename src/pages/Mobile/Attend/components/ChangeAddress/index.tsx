import { Picker } from "antd-mobile"
import { forwardRef, useImperativeHandle, useState } from "react"
import { getAddresses } from "../../../../../utils/store-addresses"

const changeAddress = (props: any, ref: any) => {
    const [visible, setVisible] = useState(false)

    const addresses = getAddresses()
    const basicColumns = [addresses.map(item => {
        return {
            ...item,
            label: item.address,
            value: item.id
        }
    })]

    const open = () => {
        setVisible(true)
    }

    const close = () => {
        setVisible(false)
    }

    useImperativeHandle(ref, () => ({
        open,
        close
    }));

    return (
        <Picker
            columns={basicColumns}
            visible={visible}
            onClose={() => {
                close()
            }}
            value={[props.addressId]}
            onConfirm={v => {
                const id = v[0]
                props.setAddress(addresses.find(item => item.id === id))
            }}
        />
    )
}

export default forwardRef(changeAddress)