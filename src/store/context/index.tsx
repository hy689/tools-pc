import { createContext, useReducer, useContext, useEffect } from "react";
import { contextStoreKey } from "../../constants";
import { IPlatformProfileRes } from "../../api";
import { RESTORE_STATE, SET_TOKEN, SET_USER } from "./types";

interface State {
    profile: IPlatformProfileRes;
    token: string | null;
    loading: boolean;
}

const initialState: State = {
    profile: {
        joinedMerchant: [{ merchant: { id: 0, name: '' } }],
        user: { realName: '' },
        merchant: { name: '', id: 0 }
    },
    token: null,
    loading: false,
}

const reducer = (state: State, action: any) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, profile: action.payload };
        case RESTORE_STATE:
            return { ...state, ...action.payload };
        case SET_TOKEN:
            return { ...state, token: action.payload }
        default:
            return state;
    }
}

const StoreContext = createContext<any>(null);
const StoreDispatchContext = createContext<any>(null);

export const useStore = (): State => {
    return useContext(StoreContext)
}

export const useStoreDispatch = () => {
    return useContext(StoreDispatchContext)
}

export default function StoreProvider({ children }: any) {
    const [store, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const savedState = sessionStorage.getItem(contextStoreKey);
        
        if (savedState && JSON.parse(savedState).token) {
            dispatch({ type: RESTORE_STATE, payload: JSON.parse(savedState) });
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem(contextStoreKey, JSON.stringify(store));
    }, [store]);

    return (
        <StoreContext.Provider value={store}>
            <StoreDispatchContext.Provider value={dispatch}>
                {children}
            </StoreDispatchContext.Provider>
        </StoreContext.Provider>
    )
}
