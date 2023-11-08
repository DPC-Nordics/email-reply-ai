import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TextButton } from "~/components/Button";
import CopyIcon from "~/components/CopyIcon";
import FormField from "~/components/FormField";

type EmailInputProps = {
  id: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minLength?: number;
  maxLength?: number;
};

function EmailInput(
  { id, name, onChange, minLength = 10, maxLength = 1000 }: EmailInputProps,
  ref: React.ForwardedRef<{ click: () => void }>
): JSX.Element {
  const [isDragOver, setIsDragOver] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    click: () => inputRef.current?.click(),
  }));

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

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
    const value = event.target.value || "";
    setCharCount(value.length);
  };

  const handlePasteText = async () => {
    if (!textAreaRef.current) return;
    try {
      const text = await navigator.clipboard.readText();
      textAreaRef.current.value = text;
    } catch (error) {
      console.log(error);
    }
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
      helpText={`${charCount} / ${maxLength} (min. ${minLength})`}
      action={
        <TextButton type="button" onClick={handlePasteText}>
          Paste <CopyIcon />
        </TextButton>
      }
    >
      <textarea
        id={id}
        ref={textAreaRef}
        name={name}
        className={clsx(
          "w-full h-80 p-2 border border-gray-400 rounded-md resize-y"
        )}
        placeholder="Drag your file or type your email here..."
        required
        onChange={handleTextChange}
        minLength={minLength}
        maxLength={maxLength}
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

export default forwardRef(EmailInput);
