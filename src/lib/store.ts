import { create } from "zustand";

export interface SystemMessage {
  period: "prior" | "start" | "end";
}

export interface UserMessage {
  name: string;
  message: string;
  tag: "observation" | "treatment" | "concern" | "important" | "none";
}

export interface SpeechMessage {
  transcript: string;
}

export interface NoteBlock {
  id: number;
  type: "user" | "system" | "speech";
  note: UserMessage | SystemMessage | SpeechMessage;
  dateTime: string;
}

export interface NoteStore {
  noteBlocks: NoteBlock[];
  patientName: string;
  patientGender: string;
  setPatientGender: (gender: string) => void;
  setPatientName: (name: string) => void;
  setNoteBlock: (
    note: UserMessage | SystemMessage | SpeechMessage,
    type: "user" | "system" | "speech",
  ) => void;
  clearNoteBlocks: () => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  noteBlocks: [] as NoteBlock[],
  patientName: "",
  patientGender: "",
  setPatientGender: (gender: string) => {
    set({ patientGender: gender });
  },
  setPatientName: (name: string) => {
    set({ patientName: name });
  },

  setNoteBlock: (
    note: UserMessage | SystemMessage | SpeechMessage,
    type: "user" | "system" | "speech",
  ) => {
    set((state) => ({
      noteBlocks: [
        ...state.noteBlocks,
        {
          id: state.noteBlocks.length,
          type: type,
          note: note,
          dateTime: new Date().toISOString(),
        } as NoteBlock,
      ],
    }));
  },
  clearNoteBlocks: () => {
    set({
      noteBlocks: [
        {
          id: 0,
          type: "system",
          note: { period: "prior" },
          dateTime: new Date().toISOString(),
        } as NoteBlock,
      ],
    });
  },
}));

export interface TranscriptState {
  currentTranscript: string;
  setCurrentTranscript: (transcript: string) => void;
  clearCurrentTranscript: () => void;
}

const useTranscriptStore = create<TranscriptState>((set) => ({
  currentTranscript: "",
  setCurrentTranscript: (transcript: string) =>
    set({ currentTranscript: transcript }),
  clearCurrentTranscript: () => set({ currentTranscript: "" }),
}));

export interface ConsultState {
  consultState: "prior" | "start" | "end";
  setConsultState: (state: "prior" | "start" | "end") => void;
}

const useConsultStore = create<ConsultState>((set) => ({
  consultState: "prior",
  setConsultState: (state: "prior" | "start" | "end") =>
    set({ consultState: state }),
}));

export { useNoteStore, useTranscriptStore, useConsultStore };
