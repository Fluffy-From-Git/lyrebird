// patient name gender dropdown  submit button
"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const gender = [
  { id: 1, option: "Male" },
  { id: 2, option: "Female" },
  { id: 3, option: "Non-binary" },
  { id: 4, option: "Prefers not to say" },
];

export default function ConsultForm() {
  const [selected, setSelected] = useState({
    id: -1,
    option: "Select an option",
  });

  return (
    // patient name
    <div className="flex gap-5 mt-4 border-b-2 pb-5 justify-between px-40">
      <div className="flex gap-5">
        <div className="relative w-44">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
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
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden leave:transition leave:duration-100 leave:ease-in closed:leave:opacity-0 sm:text-sm"
            >
              {gender.map((gender) => (
                <ListboxOption
                  key={gender.id}
                  value={gender}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-gray-600 focus:text-white focus:outline-hidden hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="block truncate font-normal group-selected:font-semibold">
                    {gender.option}
                  </span>
                  {selected.id === gender.id && (
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
      <div className="">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-4 rounded-md h-9"
        >
          Start Consult
        </button>
      </div>
    </div>
  );
}
