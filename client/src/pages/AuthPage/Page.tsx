"use client"

import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { FC, useCallback } from "react";
import { useInput } from "@/src/shared/hooks/useInput";
import { useRouter } from 'next/navigation'

const AuthPage: FC = () => {
    const { value: login, handleChangeValue: setLogin } = useInput('');
    const { value: password, handleChangeValue: setPassword } = useInput('');
    const router = useRouter()
    const handleButtonClick = useCallback(() => {
        
    }, []);
    const handleMainClick = useCallback(() => {
        router.push('/');
    }, []);
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className="shadow-lg border flex flex-col items-center px-4 py-3 rounded-xl">
                <h2 className="font-light text-2xl mb-5 select-none">Авторизация</h2>
                <Input value={login} placeholder="Логин" onChange={setLogin} className="mb-3" />
                <Input value={password} onChange={setPassword} placeholder="Пароль" className="mb-3" type="password" />
                <Button onClick={handleButtonClick}>Войти</Button> 
            </div>
            <Button className='absolute top-5 left-5' onClick={handleMainClick}>На главную</Button>
    </div>
    );
};

export default AuthPage;