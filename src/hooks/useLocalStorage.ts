import { useState, useEffect } from "react";

// Tはジェネリック型→stringとかnumberとかobjectとかいろんな形になります。
export const useLocalStorage = <T>(key:string, initialValue:T):[T,(value:T) => void] => {
    const [storedValue,setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            // ローカルストレージに値がある場合
            // json形式で取り出す
            // なければ初期値を返す
            return item ? JSON.parse(item):initialValue
        }catch(error){
            console.error(error);
            return initialValue
        }
    });
    // storedValueが変更されるたびにローカルストレジにデータを更新する副作用を持つ
    useEffect(() => {
        try{
            window.localStorage.setItem(key,JSON.stringify(storedValue))
        }catch(error){
            console.error(error)
        }
    },[key, storedValue]);

    return [storedValue,setStoredValue];
}