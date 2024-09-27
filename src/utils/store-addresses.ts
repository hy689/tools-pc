import { customizeAddressKey } from "../constants";
import { addresses, IAddress } from "../constants/attend";
import store from "./store";

export const storeAddresses =(address: IAddress)=>{
  
  const customizeAddress = JSON.parse(localStorage.getItem(customizeAddressKey) || '[]');
  if (customizeAddress.length === 0) {
    customizeAddress.push(address);
    store.setItem(customizeAddressKey, JSON.stringify(customizeAddress));
    return
  }

  const index = customizeAddress.findIndex((item: IAddress) => item.id === address.id);
  if (index === -1) {
    customizeAddress.push(address);
  }

  store.setItem(customizeAddressKey, JSON.stringify(customizeAddress));
}

export const getAddresses = () => {
  const customizeAddress = JSON.parse(localStorage.getItem(customizeAddressKey) || '[]');
  const allAddress = [...addresses, ...customizeAddress];
  return allAddress;
}