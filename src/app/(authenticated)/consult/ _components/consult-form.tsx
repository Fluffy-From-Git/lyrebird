// patient name sex dropdown  submit button
"use client";

import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import Dictaphone from "./dictaphone";

import { useNoteStore } from "@/lib/store";

const sex = [
  { id: 1, option: "Male" },
  { id: 2, option: "Female" },
  { id: 3, option: "Non-binary" },
  { id: 4, option: "Prefers not to say" },
];

export default function ConsultForm() {
  const [selected, setSelected] = useState({
    id: -1,
    option: "Sex",
  });
  const { patientName, setPatientName, setPatientGender } = useNoteStore();

  useEffect(() => {
    if (selected.id !== -1) {
      setPatientGender(selected.option);
    }
  }, [selected, setPatientGender]);

  return (
    // patient name
    <div className="flex gap-5 mt-4 border-b-2 pb-5 justify-between  max-w-6xl mx-auto px-5">
      <div className="flex gap-5">
        <div className="relative w-44">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <Listbox value={selected} onChange={setSelected}>
          <div className="relative w-44">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span
                className={`col-start-1 row-start-1 truncate pr-6 ${
                  selected.id === -1 ? "text-gray-400" : ""
                }`}
              >
                {selected.option}
              </span>

              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              aria-required="true"
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden leave:transition leave:duration-100 leave:ease-in closed:leave:opacity-0 sm:text-sm"
            >
              {sex.map((sex) => (
                <ListboxOption
                  key={sex.id}
                  value={sex}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-gray-600 focus:text-white focus:outline-hidden hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="block truncate font-normal group-selected:font-semibold">
                    {sex.option}
                  </span>
                  {selected.id === sex.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-not-selected:hidden group-focus:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
      <Dictaphone />
    </div>
  );
}
