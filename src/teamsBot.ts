import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { CardFactory, TeamsActivityHandler } from "botbuilder";
import { Starts } from "./cardModels";
import startsTemplate from "./adaptiveCards/starts.json";

const axios = require("axios");

const apiUrl = "http://localhost:8080/api/workflow/processstarts";
const username = "admin";
const password = "admin";

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const text = context.activity.text.trim().toLocaleLowerCase();
      switch (text) {
        case "starts": {
          const authHeader = `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString("base64")}`;
          const headers = {
            Authorization: authHeader,
          };

          let data;
          await axios
            .get(apiUrl, { headers })
            .then((response) => {
              data = response.data;
            })
            .catch((error) => {
              console.error(error);
            });

          await context.sendActivity({
            attachments: [
              CardFactory.adaptiveCard(
                AdaptiveCards.declare<Starts>(startsTemplate).render({
                  starts: this.parseFullRequestPaths(data),
                })
              ),
            ],
          });
        }
      }

      await next();
    });
  }

  parseFullRequestPaths(items: any[]): any[] {
    items.forEach((i) => i.fullRequestPath = i.fullRequestPath.replace("pro", "dev-workflow-ui/faces/frame.xhtml?originalUrl=starts.xhtml&taskUrl=/test/pro"))
    return items;
  }
}
