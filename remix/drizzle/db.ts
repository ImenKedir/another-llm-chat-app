import { Config } from "sst/node/config";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const connection = connect({
  url: Config.PLANETSCALE_DATABASE_URI,
});

export const db = drizzle(connection);
