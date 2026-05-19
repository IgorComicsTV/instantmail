import { Analytics } from "@vercel/analytics/react";
import { MailApp } from "./features/mail/MailApp";

export function App() {
  return (
    <>
      <MailApp />
      <Analytics />
    </>
  );
}
