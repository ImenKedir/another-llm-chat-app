import { Character } from "drizzle/model";
import { useSubmit } from "@remix-run/react";
import { formatS3ImageUrl } from "@/utils/s3";

export function CharacterCard({
  id,
  name,
  title,
  greeting,
  image,
  bucket,
}: Character & { bucket: string }) {
  const submit = useSubmit();

  function handleClick() {
    const formData = new FormData();

    formData.append("characterId", id);
    formData.append("name", name);
    formData.append("greeting", greeting);

    submit(formData, { method: "post" });
  }

  return (
    <div
      className="mx-auto flex w-full flex-col items-center"
      onClick={handleClick}
    >
      <img
        // how much space for html to reserve, not size of actual img
        width={400}
        height={225}
        src={formatS3ImageUrl(image, bucket)}
        className="rounded"
      />
      <div className="flex w-full flex-col justify-start font-[Geist] text-white">
        <div className="font-[Geist-Bold]">{name}</div>
        <div className="text-sm">{title}</div>
      </div>
    </div>
  );
}
