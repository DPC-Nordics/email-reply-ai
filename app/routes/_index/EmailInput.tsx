import clsx from "clsx";
import { useRef, useState } from "react";
import Button from "~/components/Button";
import FormField from "~/components/FormField";

export default function EmailInput({ id, name }: { id: string; name: string }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const clearFileInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const setTextAreaValue = async (file: File | undefined) => {
    if (!textAreaRef.current) return;
    if (!file || !file.type.startsWith("text"))
      throw new Error("File not valid");

    const content = await file.text();
    textAreaRef.current.value = content;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) =>
    setTextAreaValue(event.target.files?.[0])
      .catch(console.error)
      .finally(clearFileInput);

  const handleDragOver = () => setIsDragOver(true);

  const handleDragExit = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleFileDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    return setTextAreaValue(event.dataTransfer.files[0])
      .catch(console.error)
      .finally(() => setIsDragOver(false));
  };

  return (
    <FormField
      id={id}
      label="Email text"
      required
      className={clsx(
        "flex flex-col w-full relative",
        isDragOver && "brightness-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragExit}
      onDrop={handleFileDrop}
    >
      <div className="flex gap-2">
        <Button className={"w-full"} onClick={handleButtonClick}>
          Drag or Upload text file
        </Button>
        <Button type="reset">Reset</Button>
      </div>

      <textarea
        id={id}
        ref={textAreaRef}
        name={name}
        className="w-full h-80 p-2 border border-gray-400 rounded-md resize-y"
        placeholder="Or type your email here..."
        required
      />

      <input
        ref={inputRef}
        type="file"
        accept="text/*"
        onChange={handleFileChange}
        hidden
      />
    </FormField>
  );
}
