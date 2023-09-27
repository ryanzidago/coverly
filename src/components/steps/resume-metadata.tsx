import { FormData } from "@/types/form-data-type";
import TextInput from "../text-input";
import TextAreaInput from "../text-area-input";

type Props = {
  formData: FormData;
  className: string;
  updateFields: (data: any) => void;
};

export default function ResumeMetadata({
  formData: { metadata },
  className,
  updateFields,
}: Props) {
  return (
    <div className={className + " p-8 m-8 shadow w-full"}>
      <h1 className="text-xl">Resume</h1>

      <TextInput
        id="title"
        label="Resume Title"
        placeholder="Backend Software Engineering Resume"
        value={metadata.title}
        onChange={(e) =>
          updateFields({ metadata: { ...metadata, title: e.target.value } })
        }
      />
      <TextAreaInput
        id="description"
        label="Description"
        placeholder="This resume highlights past and present experiences for backend software engineering roles"
        value={metadata.description}
        onChange={(e) =>
          updateFields({
            metadata: { ...metadata, description: e.target.value },
          })
        }
      />
    </div>
  );
}
