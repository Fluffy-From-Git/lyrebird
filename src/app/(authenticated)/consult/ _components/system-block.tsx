import {
  StopIcon,
  PlayIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";

import type { NoteBlock, SystemMessage } from "@/lib/store";

const systemMessageConfig = {
  prior: {
    icon: ClipboardDocumentListIcon,
    bgColor: "text-orange-400",
    message: "Notes prior to consult",
  },
  start: {
    icon: PlayIcon,
    bgColor: "text-green-400",
    message: "Consult started",
  },
  end: {
    icon: StopIcon,
    bgColor: "text-red-400",
    message: "Consult ended",
  },
};

export default function SystemBlock({ noteBlock }: { noteBlock: NoteBlock }) {
  const systemMessage = noteBlock.note as SystemMessage;
  const message = systemMessageConfig[systemMessage.period];

  return (
    <>
      <div className="relative flex size-6 flex-none items-center justify-center bg-white">
        <message.icon
          aria-hidden="true"
          className={`size-4 ${message.bgColor}`}
        />
      </div>
      <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
        <span className="font-medium text-gray-900">{message.message}</span>
      </p>
      <time
        dateTime={noteBlock.dateTime}
        className="flex-none py-0.5 text-xs/5 text-gray-500 pr-3"
      >
        {new Date(noteBlock.dateTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </time>
    </>
  );
}
