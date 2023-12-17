import type { SSTConfig } from "sst";
import { Table, RemixSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "NaughtyML",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const messagesTable = new Table(stack, "Messages", {
        fields: {
          author: "string", // the author of the message ('user' | 'ai')
          content: "string", // the content of the message
          sendDate: "string", // date the message was sent
          userId: "string", // the user associated with the message
          messageId: "string", // uuid of the message
          conversationId: "string", // uuid of the conversation
        },
        primaryIndex: { // get all messages in a conversation sorted by send date
          partitionKey: "conversationId",
          sortKey: "sendDate",
        },
        globalIndexes: {
          "userId-index": { // get all conversations for a user
            partitionKey: "userId",
            sortKey: "conversationId",
        }
      }});

      const site = new RemixSite(stack, "site", {
        bind: [messagesTable]
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
