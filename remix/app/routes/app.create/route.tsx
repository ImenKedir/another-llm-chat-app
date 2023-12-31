import { requireAuth } from "@/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCharacter } from "drizzle/model";
import { v4 as uuidv4 } from "uuid";

import { Form } from "@remix-run/react";

export default function Create() {
  return (
    <Form method="post" style={{ color: "white" }}>
      <p>Name</p>
      <input name="name" type="text" />
      <p>Description</p>
      <input name="description" type="text" />
      <p>Greeting</p>
      <input name="greeting" type="text" />
      <button type="submit">Create</button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireAuth(request);
  const formData = await request.formData();

  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  const greeting = String(formData.get("greeting"));

  const character = await createCharacter({
    id: uuidv4(),
    name: name,
    description: description,
    greeting: greeting,
    creator: userId,
  });

  return redirect(`/app/chat/${character.id}/new`);
}
