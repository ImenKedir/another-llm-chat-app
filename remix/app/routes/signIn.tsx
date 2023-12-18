import { Link, Form } from "@remix-run/react";
import styles from "./_index.module.css"; // Adjust the path to your styles

type SignInProps = {
  userId: string | undefined;
};

const SignIn: React.FC<SignInProps> = ({ userId }) => {
  return userId ? (
    <div>
      {/* <h3>Signed in as: {userId}</h3> */}
      <Form method="post">
        <button className={styles.login_button}>
          <h3>Logout</h3>
        </button>
      </Form>
    </div>
  ) : (
    <div>
      <Link to={"/login"}>
        <button className={styles.login_button}>
          <h3>Sign In </h3>
        </button>
      </Link>
    </div>
  );
};

export default SignIn;
