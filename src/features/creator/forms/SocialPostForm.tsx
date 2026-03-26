import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";
import { FormInput, FormTextarea } from "@/features/creator/forms/FormField";

const socialPostFormSchema = z.object({
  title: z.string().min(4),
  caption: z.string().min(12),
  mediaUrl: z.string().url(),
  educationalTakeaway: z.string().min(12),
  cta: z.string().min(4),
});

type SocialPostFormValues = z.infer<typeof socialPostFormSchema>;

export const SocialPostForm = () => {
  const saveDraft = useCreatorDraftStore((state) => state.saveDraft);
  const { register, handleSubmit, formState: { errors } } = useForm<SocialPostFormValues>({
    resolver: zodResolver(socialPostFormSchema),
  });

  const onSubmit = (values: SocialPostFormValues) => {
    saveDraft({
      id: "draft-social-post",
      type: "social_post",
      title: values.title,
      payload: values,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Title" errorMessage={errors.title?.message} {...register("title")} />
      <FormTextarea label="Caption" errorMessage={errors.caption?.message} {...register("caption")} />
      <FormInput label="Media URL" errorMessage={errors.mediaUrl?.message} {...register("mediaUrl")} />
      <FormTextarea
        label="Educational takeaway"
        errorMessage={errors.educationalTakeaway?.message}
        {...register("educationalTakeaway")}
      />
      <FormInput label="CTA" errorMessage={errors.cta?.message} {...register("cta")} />
      <Button className="w-full bg-white text-black" type="submit">
        Save Draft
      </Button>
    </form>
  );
};
