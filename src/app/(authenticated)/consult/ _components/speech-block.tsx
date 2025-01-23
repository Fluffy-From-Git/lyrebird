import { MicrophoneIcon } from "@heroicons/react/20/solid";
import type { NoteBlock, SpeechMessage } from "@/lib/store";

export default function SpeechBlock({ noteBlock }: { noteBlock: NoteBlock }) {
  const speechMessage = noteBlock.note as SpeechMessage;

  return (
    <>
      <div className="relative flex size-6 flex-none items-center justify-center bg-white">
        <MicrophoneIcon
          aria-hidden="true"
          className="size-4 flex-none text-gray-600 z-0"
        />
      </div>
      <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
        <div className="flex justify-between gap-x-4">
          <div className="py-0.5 text-xs/5 text-gray-500">
            <span className="font-medium text-gray-900">
              Speech Recognition
            </span>{" "}
            detected
          </div>
          <time
            dateTime={noteBlock.dateTime}
            className="flex-none py-0.5 text-xs/5 text-gray-500"
          >
            {new Date(noteBlock.dateTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </time>
        </div>
        <p className="text-sm/6 text-gray-500">{speechMessage.transcript}</p>
      </div>
    </>
  );
}
