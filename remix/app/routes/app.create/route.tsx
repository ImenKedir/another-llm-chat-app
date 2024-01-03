import { requireAuth } from "@/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCharacter, createChat, createMessage } from "drizzle/model";

import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";

export default function Create() {
  const submit = useSubmit();

  const [file, setFile] = useState<string>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { fileUploadUrl, imageId } = await fetch("/upload", {
      method: "POST",
    }).then((res) => res.json());

    const file = (event.target as HTMLFormElement).file.files?.[0]!;

    await fetch(fileUploadUrl, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });

    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("image", imageId);

    submit(formData, { method: "post" });
  }

  return (
    <Form
      className="h-full w-full text-white"
      method="post"
      onSubmit={handleSubmit}
    >
      <p>Name</p>
      <input className="text-black" name="name" type="text" />
      <p>Short Description</p>
      <input className="text-black" name="short_description" type="text" />
      <p>Long Description</p>   
      <input className="text-black" name="greeting" type="text" />
      <p>Example Dialogue</p>
      <input className="text-black" name="long_description" type="text" />
      <p>Greeting</p>
      <input className="text-black" name="example_dialogue" type="text" />
      <p>Image</p>
      <input
        name="file"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <button type="submit">Create</button>
      <img src={file} />
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireAuth(request);

  const formData = await request.formData();

  const name = String(formData.get("name"));
  const short_description = String(formData.get("short_description"));
  const long_description = String(formData.get("long_description"));
  const example_dialogue = String(formData.get("example_dialogue"));

  const greeting = String(formData.get("greeting"));
  const image = String(formData.get("image"));

  const characterId = crypto.randomUUID();
  const chatId = crypto.randomUUID();
  const messageId = crypto.randomUUID();

  await Promise.all([
    createCharacter({
      id: characterId,
      name: name,
      short_description: short_description,
      long_description: long_description,
      example_dialogue: example_dialogue,
      greeting: greeting,
      image: image,
      creator: userId,
    }),
    createChat({
      id: chatId,
      title: `First chat with ${name}`,
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
