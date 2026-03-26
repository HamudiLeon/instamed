import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";
import { FormInput, FormTextarea } from "@/features/creator/forms/FormField";
import { vocabularyFormSchema, type VocabularyFormValues } from "@/features/creator/forms/shared";

export const VocabularyForm = () => {
  const saveDraft = useCreatorDraftStore((state) => state.saveDraft);
  const { register, handleSubmit, formState: { errors } } = useForm<VocabularyFormValues>({
    resolver: zodResolver(vocabularyFormSchema),
  });

  const onSubmit = (values: VocabularyFormValues) => {
    saveDraft({ id: "draft-vocab", type: "vocab", title: values.title, payload: values, updatedAt: new Date().toISOString() });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Deck title" errorMessage={errors.title?.message} {...register("title")} />
      <FormInput label="Term" errorMessage={errors.term?.message} {...register("term")} />
      <FormInput label="Simple definition" errorMessage={errors.simpleDefinition?.message} {...register("simpleDefinition")} />
      <FormTextarea label="Advanced definition" errorMessage={errors.advancedDefinition?.message} {...register("advancedDefinition")} />
      <FormTextarea label="Mnemonic" errorMessage={errors.mnemonic?.message} {...register("mnemonic")} />
      <Button className="w-full bg-white text-black" type="submit">Save Draft</Button>
    </form>
  );
};
