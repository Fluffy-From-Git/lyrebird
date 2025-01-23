"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaceSmileIcon,
  HeartIcon,
  XMarkIcon,
  UserIcon,
  EyeIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  MicrophoneIcon,
} from "@heroicons/react/20/solid";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import ConsultForm from "./ _components/consult-form";
import UserBlock from "./ _components/user-block";
import SystemBlock from "./ _components/system-block";
import SpeechBlock from "./ _components/speech-block";
import { useConsultStore, useNoteStore } from "@/lib/store";

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { SpeechMessage, UserMessage, SystemMessage } from "@/lib/store";

const tags = [
  {
    name: "Observation",
    value: "observation",
    icon: EyeIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-400",
    shortcut: "\\o",
  },
  {
    name: "Treatment",
    value: "treatment",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
    shortcut: "\\t",
  },
  {
    name: "Concern",
    value: "concern",
    icon: QuestionMarkCircleIcon,
    iconColor: "text-white",
    bgColor: "bg-red-400",
    shortcut: "\\c",
  },
  {
    name: "Important",
    value: "important",
    icon: ExclamationCircleIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
    shortcut: "\\i",
  },
  {
    name: "None",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
    shortcut: "\\n",
  },
];

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ConsultPage() {
  const [selected, setSelected] = useState(tags[4]);
  const [comment, setComment] = useState("");
  const scrollRef = useRef<HTMLUListElement>(null);
  const { noteBlocks, setNoteBlock, clearNoteBlocks } = useNoteStore();
  const { consultState } = useConsultStore();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    switch (comment) {
      case "\\o":
        setSelected(tags[0]);
        setComment("");
        break;
      case "\\t":
        setSelected(tags[1]);
        setComment("");
        break;
      case "\\c":
        setSelected(tags[2]);
        setComment("");
        break;
      case "\\i":
        setSelected(tags[3]);
        setComment("");
        break;
      case "\\n":
        setSelected(tags[4]);
        setComment("");
        break;
    }
  }, [comment]);

  useEffect(() => {
    if (consultState === "end") {
      SpeechRecognition.stopListening();
      if (transcript.trim()) {
        setNoteBlock(
          {
            transcript: transcript,
          },
          "speech",
        );
      }
      setNoteBlock({ period: "end" }, "system");
    }
  }, [consultState, setNoteBlock]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultState === "start") {
      setNoteBlock(
        {
          transcript: transcript,
        },
        "speech",
      );
      resetTranscript();
    }

    setNoteBlock(
      {
        name: "Practitioner",
        tag: selected.name.toLowerCase() as
          | "observation"
          | "treatment"
          | "concern"
          | "important"
          | "none",
        message: comment,
      },
      "user",
    );
    setComment("");

    setSelected(tags[4]);
  };

  useEffect(() => {
    if (listening && transcript.trim()) {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [listening, transcript]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [noteBlocks]);

  useEffect(() => {
    clearNoteBlocks();
  }, [clearNoteBlocks]);

  return (
    <>
      <ConsultForm />
      <div className="flex items-center flex-col gap-6 h-5/6 justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 w-90 min-h-[35rem] min-w-[50%] flex justify-between flex-col gap-6 w-[500px] h-[50%]">
          <ul
            role="list"
            className="space-y-6 px-2 h-full w-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-indigo-300 overflow-scroll"
            ref={scrollRef}
          >
            {noteBlocks.map((activityItem, activityItemIdx) => (
              <li key={activityItem.id} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    activityItemIdx !== noteBlocks.length - 1 && "-bottom-8",
                    "absolute top-0 left-0 flex w-6 justify-center",
                  )}
                >
                  <div className="w-px bg-gray-200" />
                </div>
                {activityItem.type === "speech" ? (
                  <SpeechBlock
                    noteBlock={{
                      id: activityItem.id,
                      type: "speech",
                      note: {
                        transcript: (activityItem.note as SpeechMessage)
                          .transcript,
                      },
                      dateTime: activityItem.dateTime,
                    }}
                  />
                ) : (
                  <>
                    {activityItem.type === "user" ? (
                      <UserBlock
                        noteBlock={{
                          id: activityItem.id,
                          type: "user",
                          note: {
                            name: (activityItem.note as UserMessage).name,
                            message: (activityItem.note as UserMessage).message,
                            tag: (activityItem.note as UserMessage).tag,
                          },
                          dateTime: activityItem.dateTime,
                        }}
                      />
                    ) : (
                      <SystemBlock
                        noteBlock={{
                          id: activityItem.id,
                          type: "system",
                          note: {
                            period: (activityItem.note as SystemMessage).period,
                          },
                          dateTime: activityItem.dateTime,
                        }}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
            {consultState === "start" && (
              <>
                <li className="relative flex gap-x-4">
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                    <MicrophoneIcon
                      aria-hidden="true"
                      className="size-6 flex-none text-red-600 z-0 animate-pulse mt-2"
                    />
                  </div>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          Active Speech Recognition
                        </span>
                      </div>
                      <time
                        dateTime={new Date().toISOString()}
                        className="flex-none py-0.5 text-xs/5 text-gray-500"
                      >
                        {new Date(new Date().toISOString()).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          },
                        )}
                      </time>
                    </div>
                    <p className="text-sm/6 text-gray-500">{transcript}</p>
                  </div>
                </li>
              </>
            )}
          </ul>

          {/* New comment form */}
          <div className="flex gap-x-3 border-t border-gray-200 pt-6">
            <UserIcon aria-hidden="true" className="size-8 text-gray-400" />

            <form
              action="#"
              className="relative flex-auto"
              onSubmit={handleAddComment}
            >
              <div className="overflow-hidden rounded-lg pb-12 outline-1 -outline-offset-1 ring-gray-400 ring-1 focus-within:ring-indigo-300 focus-within:ring-2">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={2}
                  placeholder="Add your comment..."
                  className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  required
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2 py-2 pr-2 pl-3">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <Listbox value={selected} onChange={setSelected}>
                      <Label className="sr-only">Your mood</Label>
                      <div className="relative">
                        <ListboxButton className="relative -m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-indigo-400">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                              <span>
                                <FaceSmileIcon
                                  aria-hidden="true"
                                  className="size-5 shrink-0"
                                />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={classNames(
                                    selected.bgColor,
                                    "flex size-8 items-center justify-center rounded-full",
                                  )}
                                >
                                  <selected.icon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-white"
                                  />
                                </span>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base ring-1 shadow-sm ring-black/5 focus:outline-hidden leave:transition leave:duration-100 leave:ease-in closed:leave:opacity-0 sm:ml-auto sm:w-64 sm:text-sm"
                        >
                          {tags.map((mood) => (
                            <ListboxOption
                              key={mood.value}
                              value={mood}
                              className="relative cursor-default bg-white px-3 py-2 select-none hover:bg-gray-100"
                            >
                              <div className="flex items-center">
                                <div
                                  className={classNames(
                                    mood.bgColor,
                                    "flex size-8 items-center justify-center rounded-full",
                                  )}
                                >
                                  <mood.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      mood.iconColor,
                                      "size-5 shrink-0",
                                    )}
                                  />
                                </div>

                                {/* mood name and shortcut at the end */}
                                {/* <div className="flex items-center justify-between w-full"> */}
                                <span className="ml-3 block truncate font-medium">
                                  {mood.name}
                                </span>
                                <div className="ml-auto text-gray-500 text-xs/5 tracking-wider">
                                  {mood.shortcut}
                                </div>
                              </div>
                              {/* </div> */}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1.5 text-sm font-semibold ring-1 shadow-xs ring-gray-300 ring-inset disabled:opacity-40 text-white"
                  disabled={!comment}
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
