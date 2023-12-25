import { Config } from "sst/node/config";
import { RemixSite } from "sst/node/site";
import { AuthHandler, Session, GoogleAdapter } from "sst/node/auth";
import { getUser, createUser, updateUser } from "drizzle/model"

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userId: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_AUTH_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        const user = await getUser(claims.sub);

        if (user === null) {
          await createUser({
            id: claims.sub,
            name: claims.name,
            email: claims.email,
            image: claims.picture,
          });
        } else {
          await updateUser({
            id: claims.sub,
            name: claims.name,
            email: claims.email,
            image: claims.picture,
          });
        }

        const redirectURL =
          RemixSite.site.url === "localhost"
            ? "http://localhost:3000"+ "/login"
            : RemixSite.site.url + "/login";

        return Session.parameter({
          redirect: redirectURL,
          type: "user",
          properties: {
            userId: claims.sub,
          },
        });
      },
    }),
  },
});
