import { Button, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";
import { FormInput, FormTextarea } from "@/features/creator/forms/FormField";
import { quizFormSchema, type QuizFormValues } from "@/features/creator/forms/shared";

export const QuizForm = () => {
  const saveDraft = useCreatorDraftStore((state) => state.saveDraft);
  const { register, handleSubmit, control, formState: { errors } } = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: { correctOptionId: "a" },
  });

  const onSubmit = (values: QuizFormValues) => {
    saveDraft({ id: "draft-quiz", type: "mcq", title: values.title, payload: values, updatedAt: new Date().toISOString() });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Title" errorMessage={errors.title?.message} {...register("title")} />
      <FormTextarea label="Stem" errorMessage={errors.stem?.message} {...register("stem")} />
      <FormInput label="Option A" errorMessage={errors.optionA?.message} {...register("optionA")} />
      <FormInput label="Option B" errorMessage={errors.optionB?.message} {...register("optionB")} />
      <FormInput label="Option C" errorMessage={errors.optionC?.message} {...register("optionC")} />
      <FormInput label="Option D" errorMessage={errors.optionD?.message} {...register("optionD")} />
      <Controller
        control={control}
        name="correctOptionId"
        render={({ field }) => (
          <Select
            aria-label="Correct option"
            classNames={{ trigger: "border border-white/10 bg-white/5", label: "text-slate-400", value: "text-white" }}
            label="Correct option"
            selectedKeys={[field.value]}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
          >
            {["a", "b", "c", "d"].map((id) => (
              <SelectItem key={id}>{id.toUpperCase()}</SelectItem>
            ))}
          </Select>
        )}
      />
      <Button className="w-full bg-white text-black" type="submit">Save Draft</Button>
    </form>
  );
};
