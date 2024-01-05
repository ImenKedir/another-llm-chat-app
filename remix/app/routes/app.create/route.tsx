// server
import { requireAuth } from "@/sessions.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCharacter, createChat, createMessage } from "drizzle/model";

// hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "@remix-run/react";

// components
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { Textarea } from "@/components/shadcn/textarea";
import { Form } from "@remix-run/react";

// validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// consts
const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSections = [
  {
    id: "name",
    label: "Name",
    description: "Give your character a name.",
    placeholder: "Elon Musk",
  },
  {
    id: "title",
    label: "Title",
    placeholder: "The World's Richest Man",
    description:
      "Give your character a title.\n" +
      "This is used for display purposes only, it has no effect the personality of your character.",
  },
  {
    id: "greeting",
    label: "Greeting",
    description:
      "Describe what your character will say at the start of a conversation.",
    placeholder:
      "Hi, I'm Elon Musk. I'm the CEO of Tesla and SpaceX. I'm also a billionaire.",
  },
  {
    id: "shortDescription",
    label: "Short Description",
    description:
      "Describe your character using 1-2 word adjectives seperated by commas.",
    placeholder: "Self-reliant, Morally gray, Competitive",
  },
  {
    id: "longDescription",
    label: "Long Description",
    description: "Expand apon the short description with full sentences.",
    placeholder:
      "Elon Musk is the CEO of Tesla and SpaceX. Elon thinks he is God's blessing to humanity.",
  },
  {
    id: "exampleDialogue",
    label: "Example Dialogue (Optional)",
    description:
      "Provide some example dialouge, this helps the AI get in character.\n" +
      "For the best results use the {{user}} and {{char}} placeholders when refering to the current user and character.",
    placeholder:
      "{{user}}: Hi Elon, I've been really impressed with SpaceX's progress.\n" +
      "{{char}}: Hey, Thanks for your interest. I belive it is essential for humans get to mars",
  },
];

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name can't be empty!" })
    .max(256, { message: "Name must be less than 256 characters long." }),
  title: z
    .string()
    .min(1, { message: "Title can't be empty!" })
    .max(256, { message: "Title must be less than 256 characters long" }),
  greeting: z.string().min(1, { message: "Greeting can't be empty!" }),
  shortDescription: z.string().min(1, {
    message: "Short Description can't be empty!",
  }),
  longDescription: z.string().min(1, {
    message: "Long description can't be empty!",
  }),
  image: z
    .any()
    .refine((file) => {
      return file.length > 0;
    }, "You must upload an image for your character")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 1MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  exampleDialogue: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create() {
  const submit = useSubmit();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    const { fileUploadUrl, imageId } = await fetch("/upload", {
      method: "POST",
    }).then((res) => res.json());

    await fetch(fileUploadUrl, {
      body: values.image[0],
      method: "PUT",
      headers: {
        "Content-Type": values.image[0].type,
        "Content-Disposition": `attachment; filename="${values.image[0].name}"`,
      },
    });

    const formData = new FormData();

    for (const key in values) {
      if (key === "image") {
        formData.append(key, imageId);
      } else {
        formData.append(key, values[key as keyof FormValues]);
      }
    }

    submit(formData, { method: "post" });
  }

  return (
    <div className="h-full w-full overflow-y-scroll">
      <header className="sticky top-0 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Create</h1>
      </header>
      <Form
        className="mx-auto flex h-full w-full max-w-[1440px] flex-col gap-4 px-4 pt-4 font-[Geist] text-white md:px-8"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formSections.map((section) => (
          <div key={section.id} className="flex flex-col gap-2">
            <h3 className="font-['Geist-Bold'] text-xl">{section.label}</h3>
            <p className="text-sm text-[var(--secondary-light)]">
              {section.description}
            </p>
            <Textarea
              {...register(section.id as keyof FormValues)}
              placeholder={section.placeholder}
            />
            <p className="text-sm text-red-600">
              {
                // @ts-ignore
                errors[section.id]?.message
              }
            </p>
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <h3 className="font-['Geist-Bold']">Image</h3>
          <p className="text-sm text-[var(--secondary-light)]">
            Upload an image for your character
          </p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("image")}
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          />
          <p className="text-sm text-red-600">
            {errors.image?.message as string}
          </p>
        </div>
        {selectedImage && (
          <div className="md:max-w-[200px]">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          </div>
        )}
        <button
          className="max-w-[200px] rounded bg-[var(--primary-accent)] px-4 py-2 font-bold text-white hover:opacity-80"
          disabled={isSubmitting}
          type="submit"
        >
          Create
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const [userId, formData] = await Promise.all([
    requireAuth(request),
    request.formData(),
  ]);

  const [
    name,
    title,
    greeting,
    shortDescription,
    longDescription,
    exampleDialogue,
    image,
  ] = [
    formData.get("name"),
    formData.get("title"),
    formData.get("greeting"),
    formData.get("shortDescription"),
    formData.get("longDescription"),
    formData.get("exampleDialogue"),
    formData.get("image"),
  ];

  if (
    name === null ||
    title === null ||
    greeting === null ||
    shortDescription === null ||
    longDescription === null ||
    image === null
  ) {
    throw new Response("Bad Request", { status: 400 });
  }

  const [characterId, chatId, messageId] = [
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
  ];

  await Promise.all([
    createCharacter({
      id: characterId,
      name: String(name),
      title: String(title),
      shortDescription: String(shortDescription),
      longDescription: String(longDescription),
      exampleDialogue: String(exampleDialogue),
      greeting: String(greeting),
      image: String(image),
      creator: userId,
    }),
    createChat({
      id: chatId,
      title: String(name),
      user: userId,
      character: characterId,
      created: new Date().toISOString(),
    }),
    createMessage({
      id: messageId,
      author: "ai",
      content: String(greeting),
      chat: chatId,
      created: new Date().toISOString(),
    }),
  ]);

  return redirect(`/app/chat/${characterId}/${chatId}`);
}
