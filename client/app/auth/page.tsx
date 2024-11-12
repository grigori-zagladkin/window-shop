import { AuthPage } from "@/src/pages/AuthPage";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Авторизация',
}

const Page = async () => {
    return <AuthPage />
};

export default Page;