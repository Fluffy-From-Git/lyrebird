import type { NoteBlock } from "@/lib/store";
import type { UserMessage } from "@/lib/store";
import {
  HeartIcon,
  EyeIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

const tagConfig = {
  observation: {
    icon: EyeIcon,
    bgColor: "bg-blue-400",
  },
  treatment: {
    icon: HeartIcon,
    bgColor: "bg-green-400",
  },
  concern: {
    icon: QuestionMarkCircleIcon,
    bgColor: "bg-red-400",
  },
  important: {
    icon: ExclamationCircleIcon,
    bgColor: "bg-yellow-400",
  },
  none: {
    icon: PencilIcon,
    bgColor: "bg-gray-400",
  },
};

export default function UserBlock({ noteBlock }: { noteBlock: NoteBlock }) {
  const userMessage = noteBlock.note as UserMessage;
  const tag = tagConfig[userMessage.tag] || tagConfig.none;

  return (
    <>
      <div className="relative flex size-6 flex-none items-center justify-center bg-white mt-2">
        <div
          className={`flex size-6 items-center justify-center rounded-full ${tag.bgColor}`}
        >
          <tag.icon aria-hidden="true" className="size-4 shrink-0 text-white" />
        </div>
      </div>
      <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
        <div className="flex justify-between gap-x-4">
          <div className="py-0.5 text-xs/5 text-gray-500">
            <span className="font-medium text-gray-900">
              {userMessage.name}
            </span>{" "}
            noted
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
        <p className="text-sm/6 text-gray-500">{userMessage.message}</p>
      </div>
    </>
  );
}
