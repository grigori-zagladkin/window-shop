import { ChangeEvent, useCallback, useState } from "react";

type TUseInput = (initialValue: string) => {
    value: string;
    handleChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput: TUseInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);
    return {
        value, handleChangeValue
    }
}