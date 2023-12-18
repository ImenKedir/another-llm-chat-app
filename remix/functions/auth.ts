import { AuthHandler, Session, GoogleAdapter } from "sst/node/auth";
import { RemixSite } from "sst/node/site";

const GOOGLE_CLIENT_ID =
  "902188418129-rmhvn4kk7k4j731pcc27fkn9gnpj3t5f.apps.googleusercontent.com";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        const redirectURL =
          RemixSite.site.url === "localhost"
            ? "http://localhost:3000/login"
            : RemixSite.site.url + "/login";

        return Session.parameter({
          redirect: redirectURL,
          type: "user",
          properties: {
            userID: claims.sub,
          },
        });
      },
    }),
  },
});
