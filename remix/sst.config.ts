import type { SSTConfig } from "sst";
import { Table, RemixSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "remix",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const table = new Table(stack, "counter", {
        fields: {
          counter: "string",
        },
        primaryIndex: { partitionKey: "counter" },
      });

      const site = new RemixSite(stack, "site", {
        bind: [table]
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
