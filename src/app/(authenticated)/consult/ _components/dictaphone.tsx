"use client";

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@/components/ui/button";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { useConsultStore, useNoteStore } from "@/lib/store";
const Dictaphone = () => {
  const { listening } = useSpeechRecognition();

  const { consultState, setConsultState } = useConsultStore();
  const { setNoteBlock } = useNoteStore();

  const startListening = async () => {
    setConsultState("start");
    setNoteBlock({ period: "start" }, "system");
    await SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setConsultState("end");
  };

  return (
    <Button
      disabled={consultState === "end" || false}
      onClick={listening ? stopListening : startListening}
      className={`${consultState === "end" || false ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-semibold py-1 px-4 rounded-md h-9`}
    >
      <MicrophoneIcon className={"mr-2"} />
      {consultState === "end"
        ? "Consult Ended"
        : listening
          ? "Stop consult"
          : "Start consult"}
    </Button>
  );
};
export default Dictaphone;
