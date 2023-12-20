import { Link, Form } from "@remix-run/react";
import styles from "@/routes/_index/_index.module.css";

type SignInProps = {
  userId: string | undefined;
};

const SignInButton: React.FC<SignInProps> = ({ userId }) => {
  return userId ? (
    <div>
      {/* <h3>Signed in as: {userId}</h3> */}
      <Form method="post">
        <button className={styles.signin_button}>
          <h4>Logout</h4>
        </button>
      </Form>
    </div>
  ) : (
    <div>
      <Link to={"/login"}>
        <button className={styles.signin_button}>
          <h3>Sign In </h3>
        </button>
      </Link>
    </div>
  );
};

export default SignInButton;
