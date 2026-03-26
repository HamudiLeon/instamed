import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";
import { FormInput, FormTextarea } from "@/features/creator/forms/FormField";
import { anatomyFormSchema, type AnatomyFormValues } from "@/features/creator/forms/shared";

export const AnatomyForm = () => {
  const saveDraft = useCreatorDraftStore((state) => state.saveDraft);
  const { register, handleSubmit, formState: { errors } } = useForm<AnatomyFormValues>({
    resolver: zodResolver(anatomyFormSchema),
  });

  const onSubmit = (values: AnatomyFormValues) => {
    saveDraft({ id: "draft-anatomy", type: "anatomy_image", title: values.title, payload: values, updatedAt: new Date().toISOString() });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Title" errorMessage={errors.title?.message} {...register("title")} />
      <FormInput label="Prompt" errorMessage={errors.prompt?.message} {...register("prompt")} />
      <FormInput label="Image URL" errorMessage={errors.imageUrl?.message} {...register("imageUrl")} />
      <FormTextarea label="Answer explanation" errorMessage={errors.answerExplanation?.message} {...register("answerExplanation")} />
      <Button className="w-full bg-white text-black" type="submit">Save Draft</Button>
    </form>
  );
};
