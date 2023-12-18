import { Link, useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs, redirect, json } from '@remix-run/node'
import { getSession, commitSession } from '@/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'))

    // user is already logged in
    if (session.has('userId')) {
        return redirect('/')
    }

    const token = new URL(request.url).searchParams.get('token')
    // user just logged in and has been redirected back here with a token
    if (token) {
        session.set('userId', token)
        return redirect('/', {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        })
    }

    // user is not logged in, pass the auth api url to the client
    return json({ authApiURL: process.env.AUTH_API_URL })
}

export default function Login() {
    const data = useLoaderData<typeof loader>()

    if (!data.authApiURL) return null

    return (
        <div>
            <h1>Auth</h1>
            <Link to={data.authApiURL + '/google/authorize'}>
                Login with Google
            </Link>
        </div>
    )
}
