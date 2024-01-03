import { requireAuth } from "@/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCharacter, createChat, createMessage } from "drizzle/model";

import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { Textarea } from "@/components/shadcn/textarea";

const fromSections = [
  {
    title: "Name",
    description: "First and last(optional) name",
    placeholder: "Elon Musk",
  },
  {
    title: "Short Description",
    description: "Describe your character using 1-2 word adjectives",
    placeholder: "Self-reliant, Morally gray, Competitive",
  },
  {
    title: "Long Description",
    description: "Expand the description with short sentences",
    placeholder: "Elon Musk is the CEO of Tesla and SpaceX. Elon thinks he is God's blessing to humanity."
  },
  {
    title: "Sample Conversation",
    description: "Descibe how you want your character to respond",
    placeholder: "User: Hi Elon, I've been really impressed with SpaceX's progress. &#10;Elon Musk: Hey there! Thanks for your interest."
  },
  {
    title: "Greeting",
    description:
      "Describe what your character will say at the start of a conversation",
    placeholder: "Hi, I'm Elon Musk. I'm the CEO of Tesla and SpaceX. I'm also a billionaire.",
  }
];


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
    <div className="h-full w-full overflow-y-scroll">
      <header className="sticky top-0 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Create</h1>
      </header>
      <Form
        className="flex flex-col gap-4 py-2 px-4 h-full w-full max-w-[1440px]  text-white "
        method="post"
        onSubmit={handleSubmit}
      >
        {fromSections.map((section) => (
          <>
          <div className="flex flex-row">
            <h3 className="font-['Geist-Bold']">{section.title}</h3>
            <p className="ml-4">{section.description}</p>
          </div>
          <Textarea
            name={section.title.toLowerCase().replace(" ", "_")}
            placeholder={section.placeholder}
            />
            </>
        ))}
         <h3 className="font-['Geist-Bold']">Image</h3>
        <input
          name="file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <button
          className="rounded bg-[var(--primary-accent)] px-4 py-2 mb-10 max-w-[200px] font-bold text-white hover:opacity-80"
          type="submit"
        >
          Create
        </button>
        <img src={file} />
      </Form>

    </div>
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
