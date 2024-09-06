import { TimelineAction, TimelineRow } from "../../interface/action";
import { TimelineEffect } from "../../interface/effect";
import audioControl from "./audioControl";

export interface CustomTimelineAction extends TimelineAction {
  data: {
    id?: string;
    src: string;
    peak?: string;
    name: string;
  };
}

export interface CusTomTimelineRow extends TimelineRow {
  actions: CustomTimelineAction[];
}

export const mockEffect2: Record<string, TimelineEffect> = {
  audioPlayer: {
    id: "audioPlayer",
    name: "음원재생",
    source: {
      start: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = (action as CustomTimelineAction).data.src;
          const id = (action as CustomTimelineAction).data.id;
          audioControl.start({
            id,
            src,
            startTime: action.start,
            engine,
            time,
          });
        }
      },
      enter: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = (action as CustomTimelineAction).data.src;
          const id = (action as CustomTimelineAction).data.id;
          audioControl.start({
            id,
            src,
            startTime: action.start,
            engine,
            time,
          });
        }
      },
      leave: ({ action, engine }) => {
        const id = (action as CustomTimelineAction).data.id;
        audioControl.stop({ id: id, engine });
      },
      stop: ({ action, engine }) => {
        const id = (action as CustomTimelineAction).data.id;
        audioControl.stop({ id: id, engine });
      },
    },
  },
  audioStreammingPlayer: {
    id: "audioStreammingPlayer",
    name: "음원재생",
    source: {
      start: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = (action as CustomTimelineAction).data.src;
          const id = (action as CustomTimelineAction).data.id;
          audioControl.start({
            id,
            src,
            startTime: action.start,
            engine,
            time,
            isStreamming: true,
          });
        }
      },
      enter: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = (action as CustomTimelineAction).data.src;
          const id = (action as CustomTimelineAction).data.id;
          audioControl.start({
            id,
            src,
            startTime: action.start,
            engine,
            time,
            isStreamming: true,
          });
        }
      },
      leave: ({ action, engine }) => {
        const id = (action as CustomTimelineAction).data.id;
        audioControl.stop({ id, engine });
      },
      stop: ({ action, engine }) => {
        const src = (action as CustomTimelineAction).data.src;
        const id = (action as CustomTimelineAction).data.id;
        audioControl.stop({ id, engine });
      },
    },
  },
};

export const mockData2: CusTomTimelineRow[] = [
  {
    id: "1",
    actions: [
      {
        id: "최애의아이",
        start: 0.001,
        end: 5,
        effectId: "audioPlayer",
        data: {
          id: "최애의아이",
          src: "/audio/최애의아이.mp3",
          name: "최애의아이",
        },
      },
      {
        id: "최애의아이2",
        start: 6,
        end: 10,
        effectId: "audioPlayer",
        data: {
          id: "최애의아이2",
          src: "/audio/최애의아이.mp3",
          name: "최애의아이2",
        },
      },
      // ...Array.from({ length: 20 }).map((_, i) => ({
      //   id: `내손을잡아${i}`,
      //   start: i * 5,
      //   end: i * 5 + 5,
      //   effectId: "audioPlayer",
      //   data: {
      //     id: `내손을잡아${i}`,
      //     src: "/audio/내손을잡아.mp3",
      //     name: `내손을잡아${i}`,
      //   },
      // })),
    ],
  },

  // ...Array.from({ length: 20 }).map((_, i) => ({
  //   id: `${i + 3}`,
  //   actions: [
  //     {
  //       id: `최애의아이${i}`,
  //       start: i * 5,
  //       end: i * 5 + 5,
  //       effectId: "audioPlayer",
  //       data: {
  //         id: `최애의아이${i}`,
  //         src: "/audio/최애의아이.mp3",
  //         name: `최애의아이${i}`,
  //       },
  //     },
  //   ],
  // })),

  // {
  //   id: "3",
  //   actions: [
  //     {
  //       id: "스트리밍",
  //       start: 0,
  //       end: 4008,
  //       effectId: "audioStreammingPlayer",
  //       data: {
  //         src: "https://d2u3ecdp9u36hp.cloudfront.net/music_replacement/2/20240829/dQNsCjxEoE0EJ8w=/web_convert%2FStreetFoodFighterEp01_SOV.mp3",
  //         peak: "https://d2u3ecdp9u36hp.cloudfront.net/music_replacement/2/20240829/dQNsCjxEoE0EJ8w=/web_convert%2FStreetFoodFighterEp01_SOV_48.json",
  //         name: "스트리밍(1시간 6분 48초)",
  //       },
  //     },
  //   ],
  // },
];
