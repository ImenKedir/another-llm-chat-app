import { Link } from "@remix-run/react";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to NaughtML!</h1>
      <p>
        This will be the landing page. Click the link below to go to the app.
      </p>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
