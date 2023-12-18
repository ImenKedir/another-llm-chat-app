import { Link, Form } from '@remix-run/react'
import styles from './_index.module.css' // Adjust the path to your styles

type SignInProps = {
    userId: string | undefined
}

const SignIn: React.FC<SignInProps> = ({ userId }) => {
    return userId ? (
        <div className={styles.container}>
            <h1>Signed in as: {userId}</h1>
            <Form method="post">
                <button>Logout</button>
            </Form>
        </div>
    ) : (
        <div>
            <h3>You are not signed in</h3>
            <Link to={'/login'}>
                <button>click here to login</button>
            </Link>
        </div>
    )
}

export default SignIn
