import FormField from "~/components/FormField";
import { langs } from "~/utils/langs";

export default function LanguageSelect({
  id,
  name,
}: {
  id: string;
  name: string;
}): JSX.Element {
  return (
    <FormField id={id} label="Language" required className="flex-1">
      <select id={id} name={name} className="rounded border-gray-400" required>
        {langs.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </FormField>
  );
}
