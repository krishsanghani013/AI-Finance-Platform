import { Inngest } from "inngest";
 
export const inngest = new Inngest({
    id: "flowoid",
    name: "Flowoid AI Finance Platform",
    isDev: process.env.NODE_ENV === "development",
});