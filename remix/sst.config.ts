import type { SSTConfig } from "sst";
import { Api, Auth, RemixSite, Bucket, Config } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export default {
  config(_input) {
    return {
      name: "NaughtyML",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const GOOGLE_AUTH_CLIENT_ID = 
        new Config.Secret(stack, "GOOGLE_AUTH_CLIENT_ID");

      const PLANETSCALE_DATABASE_URI = 
        new Config.Secret(stack, "PLANETSCALE_DATABASE_URI");

      const OPENROUTER_API_KEY = 
        new Config.Secret(stack, "OPENROUTER_API_KEY")

      const OPENROUTER_API_URL = new Config.Parameter(stack, "OPENROUTER_API_URL", {
        value: "https://openrouter.ai/api/v1/chat/completions",
      });

      const authApi = new Api(stack, "authApi");

      const AUTH_API_URL = new Config.Parameter(stack, "AUTH_API_URL", {
        value: authApi.url + "/auth",
      });

      const bucket = new Bucket(stack, "content", {
        notifications: {
          resize: {
            function: {
              handler: "functions/resize.handler",
              nodejs: {
                esbuild: {
                  external: ["sharp"],
                },
              },
              layers: [
                new lambda.LayerVersion(stack, "SharpLayer", {
                  code: lambda.Code.fromAsset("layers/sharp"),
                }),
              ],
            },
            events: ["object_created"],
          },
        },
      });

      bucket.attachPermissions([bucket]);

      const site = new RemixSite(stack, "site", {
        bind: [
          bucket,
          AUTH_API_URL,
          OPENROUTER_API_KEY,
          OPENROUTER_API_URL,
          PLANETSCALE_DATABASE_URI,
        ]
      });

      const authFunction = new Auth(stack, "auth", {
        authenticator: {
          handler: "functions/auth.handler",
          bind: [
            site, 
            GOOGLE_AUTH_CLIENT_ID,
            PLANETSCALE_DATABASE_URI,
          ],
        },
      });

      authFunction.attach(stack, {
        api: authApi,
        prefix: "/auth",
      });

      stack.addOutputs({
        SiteURL: site.url || "Site URL not available until after deployment",
        ImageBucket: bucket.bucketName,
        GoogleAuth: authApi.url + "/auth/google/authorize",
        GoogleAuthCallback: authApi.url + "/auth/google/callback",
      });
    });
  },
} satisfies SSTConfig;
