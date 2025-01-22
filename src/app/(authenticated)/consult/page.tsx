"use client";

import { useState } from "react";
import {
  FaceSmileIcon,
  HeartIcon,
  XMarkIcon,
  MicrophoneIcon,
  UserIcon,
  EyeIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  PlayIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import ConsultForm from "./ _components/consult-form";

const activity = [
  {
    id: 1,
    type: "",
    person: { name: "Notes prior to consult" },
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "comment",
    tag: 0,
    person: { name: "Ibrahim Ghoneim" },
    comment: "Patient has been very responsive and polite.",
    dateTime: "2023-01-23T10:45",
  },
  {
    id: 3,
    type: "",
    person: { name: "Consult started" },
    dateTime: "2023-01-23T11:32",
  },
  {
    id: 4,
    type: "text-speech",
    comment:
      "I feel very sick and I have a headache. I have been feeling this way for 3 sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown days. †he quick brown",
    dateTime: "2023-01-23T11:45",
  },
  {
    id: 5,
    type: "comment",
    tag: 3,
    person: { name: "Ibrahim Ghoneim" },
    comment: "Patient has been feeling sick for 3 days.",
    dateTime: "2023-01-23T11:45",
  },
  {
    id: 6,
    type: "comment",
    tag: 3,
    person: { name: "Ibrahim Ghoneim" },
    comment: "Patient has been feeling sick for 3 days.",
    dateTime: "2023-01-23T11:45",
  },

  {
    id: 7,
    type: "text-speech",
    comment:
      "I feel very sick and I have a headache. I have been feeling this way for 3 sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown days. †he quick brown",
    dateTime: "2023-01-23T11:45",
  },
  {
    id: 8,
    type: "text-speech",
    comment:
      "I feel very sick and I have a headache. I have been feeling this way for 3 sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown sick and I have a headache. I have been feeling this way for 3 days. †he quick brown days. †he quick brown",
    dateTime: "2023-01-23T11:45",
  },
];

const tags = [
  {
    name: "Observation",
    value: "observation",
    icon: EyeIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-400",
  },
  {
    name: "Treatment",
    value: "treatment",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Concern",
    value: "concern",
    icon: QuestionMarkCircleIcon,
    iconColor: "text-white",
    bgColor: "bg-red-400",
  },
  {
    name: "Important",
    value: "important",
    icon: ExclamationCircleIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "None",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ConsultPage() {
  const [selected, setSelected] = useState(tags[4]);

  return (
    <>
      <ConsultForm />
      <div className="flex items-center flex-col gap-6 h-5/6 justify-center">
        <div className="bg-white rounded-lg shadow-sm p-6 w-90 min-h-[35rem] min-w-[50%] flex justify-between flex-col gap-6 w-[500px] h-[50%]">
          <ul role="list" className="space-y-6 h-100 w-full overflow-y-auto">
            {activity.map((activityItem, activityItemIdx) => (
              <li key={activityItem.id} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    activityItemIdx === activity.length - 1
                      ? "h-8"
                      : "-bottom-8",
                    "absolute top-0 left-0 flex w-6 justify-center",
                  )}
                >
                  <div className="w-px bg-gray-200" />
                </div>
                {activityItem.type === "text-speech" ? (
                  <>
                    <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                      <MicrophoneIcon
                        aria-hidden="true"
                        className="size-4 flex-none text-gray-400 z-0"
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
                          dateTime={activityItem.dateTime}
                          className="flex-none py-0.5 text-xs/5 text-gray-500"
                        >
                          {new Date(activityItem.dateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                            },
                          )}
                        </time>
                      </div>
                      <p className="text-sm/6 text-gray-500">
                        {activityItem.comment}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {activityItem.type === "comment" ? (
                      <>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                          <MicrophoneIcon
                            aria-hidden="true"
                            className="size-4 flex-none text-gray-400 z-0"
                          />
                        </div>
                        <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-xs/5 text-gray-500">
                              <span className="font-medium text-gray-900">
                                {activityItem.person.name}
                              </span>{" "}
                              noted
                            </div>
                            <time
                              dateTime={activityItem.dateTime}
                              className="flex-none py-0.5 text-xs/5 text-gray-500"
                            >
                              {new Date(
                                activityItem.dateTime,
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </time>
                          </div>
                          <p className="text-sm/6 text-gray-500">
                            {activityItem.comment}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                          {activityItem.person.name === "Consult started" ? (
                            <PlayIcon
                              aria-hidden="true"
                              className="size-4 text-green-400"
                            ></PlayIcon>
                          ) : (
                            <ClipboardDocumentListIcon
                              aria-hidden="true"
                              className="size-4 text-orange-400"
                            ></ClipboardDocumentListIcon>
                          )}
                        </div>
                        <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </span>{" "}
                          {activityItem.type}
                        </p>
                        <time
                          dateTime={activityItem.dateTime}
                          className="flex-none py-0.5 text-xs/5 text-gray-500"
                        >
                          {new Date(activityItem.dateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                            },
                          )}
                        </time>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* New comment form */}
          <div className="mt-6 flex gap-x-3 border-t border-gray-200 pt-6">
            <UserIcon aria-hidden="true" className="size-8 text-gray-400" />

            <form action="#" className="relative flex-auto">
              <div className="overflow-hidden rounded-lg pb-12 outline-1 -outline-offset-1 ring-gray-400 ring-1 focus-within:ring-gray-900 focus-within:ring-2">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={2}
                  placeholder="Add your comment..."
                  className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  defaultValue={""}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2 py-2 pr-2 pl-3">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <Listbox value={selected} onChange={setSelected}>
                      <Label className="sr-only">Your mood</Label>
                      <div className="relative">
                        <ListboxButton className="relative -m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
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
                                <span className="ml-3 block truncate font-medium">
                                  {mood.name}
                                </span>
                              </div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
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
