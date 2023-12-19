import type { SSTConfig } from "sst";
import { Api, Auth, RemixSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "NaughtyML",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const authApi = new Api(stack, "authApi");

      const site = new RemixSite(stack, "site", {
        environment: {
          AUTH_API_URL: authApi.url + "/auth",
        },
      });

      const auth = new Auth(stack, "auth", {
        authenticator: {
          handler: "functions/auth.handler",
          bind: [site],
        },
      });

      auth.attach(stack, {
        api: authApi,
        prefix: "/auth",
      });

      stack.addOutputs({
        GoogleAuth: authApi.url + "/auth/google/authorize",
        GoogleAuthCallback: authApi.url + "/auth/google/callback",
        SiteURL: site.url || "Site URL not available until after deployment",
      });
    });
  },
} satisfies SSTConfig;
