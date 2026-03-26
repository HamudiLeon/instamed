import { Button, Card, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs, useDisclosure } from "@heroui/react";
import { AnatomyForm } from "@/features/creator/forms/AnatomyForm";
import { ClinicalCaseForm } from "@/features/creator/forms/ClinicalCaseForm";
import { QuizForm } from "@/features/creator/forms/QuizForm";
import { SocialPostForm } from "@/features/creator/forms/SocialPostForm";
import { VocabularyForm } from "@/features/creator/forms/VocabularyForm";
import { useCreatorDraftStore } from "@/stores/creatorDraftStore";

export const CreatorStudioPage = () => {
  const drafts = useCreatorDraftStore((state) => state.drafts);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const latestDraft = drafts.at(-1);

  return (
    <main className="min-h-screen space-y-4 px-4 pb-32 pt-[calc(var(--safe-top)+1rem)]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Creator Studio</p>
        <h1 className="text-2xl font-semibold">Publish Study Reels</h1>
      </div>
      <Card className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-none">
        <p className="text-sm text-slate-400">Drafts saved locally</p>
        <p className="mt-1 text-3xl font-semibold text-white">{drafts.length}</p>
        <Button className="mt-4 bg-white/8 text-white" isDisabled={!latestDraft} radius="full" variant="flat" onPress={onOpen}>
          Preview Latest Draft
        </Button>
      </Card>
      <Tabs
        aria-label="Creator forms"
        classNames={{
          tabList: "grid grid-cols-5 bg-transparent p-0",
          tab: "border border-white/10 bg-white/5",
          tabContent: "text-xs text-white",
        }}
      >
        <Tab key="clinical" title="Clinical">
          <ClinicalCaseForm />
        </Tab>
        <Tab key="vocab" title="Vocab">
          <VocabularyForm />
        </Tab>
        <Tab key="anatomy" title="Anatomy">
          <AnatomyForm />
        </Tab>
        <Tab key="quiz" title="Quiz">
          <QuizForm />
        </Tab>
        <Tab key="social" title="Social">
          <SocialPostForm />
        </Tab>
      </Tabs>
      <Modal
        backdrop="blur"
        classNames={{ base: "border border-white/10 bg-panel text-white" }}
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Latest Draft Preview</ModalHeader>
          <ModalBody className="pb-6">
            {latestDraft ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-400">{latestDraft.type}</p>
                <p className="text-lg font-semibold">{latestDraft.title}</p>
                <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-slate-300">
                  {JSON.stringify(latestDraft.payload, null, 2)}
                </pre>
              </div>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  );
};
