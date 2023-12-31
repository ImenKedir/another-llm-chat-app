import { requireAuth } from "@/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCharacter, createChat, createMessage } from "drizzle/model";

import { Form, useSubmit } from "@remix-run/react";

export default function Create() {
  const submit = useSubmit();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fileUploadUrl = await fetch("/upload", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => res.url);

    const file = (event.target as HTMLFormElement).file.files?.[0]!;

    const image = await fetch(fileUploadUrl, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });

    const imageUrl = image.url.split("?")[0];

    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("imageUrl", imageUrl);

    submit(formData, { method: "post" });
  }

  return (
    <Form method="post" onSubmit={submitHandler} style={{ color: "white" }}>
      <p>Name</p>
      <input name="name" type="text" />
      <p>Description</p>
      <input name="description" type="text" />
      <p>Greeting</p>
      <input name="greeting" type="text" />
      <p>Image</p>
      <input name="file" type="file" accept="image/png, image/jpeg" />
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
  const imageUrl = String(formData.get("imageUrl"));

  const characterId = crypto.randomUUID();
  const chatId = crypto.randomUUID();
  const messageId = crypto.randomUUID();

  await Promise.all([
    createCharacter({
      id: characterId,
      name: name,
      description: description,
      greeting: greeting,
      image: imageUrl,
      creator: userId,
    }),
    createChat({
      id: chatId,
      title: name,
      user: userId,
      character: characterId,
      created: new Date().toISOString(),
    }),
    createMessage({
      id: messageId,
      author: "ai",
      content: greeting,
      chat: chatId,
      created: new Date().toISOString(),
    }),
  ]);

  return redirect(`/app/chat/${characterId}/${chatId}`);
}
