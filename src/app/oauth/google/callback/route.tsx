import { api } from "@/services/api"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code')
    const res = await api.post('/auth/google/callback', null, {
        params: {
            code 
        }
    })
    cookies().set('token', res.data.token)

    redirect('/')
}