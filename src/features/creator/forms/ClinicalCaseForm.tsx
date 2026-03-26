import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";
import { clinicalCaseFormSchema, type ClinicalCaseFormValues } from "@/features/creator/forms/shared";
import { FormInput, FormTextarea } from "@/features/creator/forms/FormField";

export const ClinicalCaseForm = () => {
  const saveDraft = useCreatorDraftStore((state) => state.saveDraft);
  const { register, handleSubmit, formState: { errors } } = useForm<ClinicalCaseFormValues>({
    resolver: zodResolver(clinicalCaseFormSchema),
    defaultValues: {
      title: "Mechanism-first ACS mimic",
      stem: "",
      question: "",
      answer: "",
      explanation: "",
      mechanism: "",
    },
  });

  const onSubmit = (values: ClinicalCaseFormValues) => {
    saveDraft({
      id: "draft-clinical-case",
      type: "clinical_case",
      title: values.title,
      payload: values,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Title" errorMessage={errors.title?.message} {...register("title")} />
      <FormTextarea label="Stem" errorMessage={errors.stem?.message} {...register("stem")} />
      <FormInput label="Question" errorMessage={errors.question?.message} {...register("question")} />
      <FormInput label="Answer" errorMessage={errors.answer?.message} {...register("answer")} />
      <FormTextarea label="Explanation" errorMessage={errors.explanation?.message} {...register("explanation")} />
      <FormTextarea label="Mechanism" errorMessage={errors.mechanism?.message} {...register("mechanism")} />
      <Button className="w-full bg-white text-black" type="submit">Save Draft</Button>
    </form>
  );
};
