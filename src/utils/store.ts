
export default {
    getItem(key: string){
        return localStorage.getItem(key);
    },
    setItem(key: string, value: string){
        localStorage.setItem(key, value);
    }
}