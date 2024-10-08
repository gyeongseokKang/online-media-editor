import { AudioPlayerSegment } from "@/libs/react-timeline-editor/interface/segment";
import { EffectSourceParam, TimelineEffect } from "../../../interface/effect";

import audioControl from "../control/audioControl";

export interface AudioPlayerEffect extends TimelineEffect {
  id: "audioPlayer";
  source: {
    start?: (param: EffectSourceParam<AudioPlayerSegment>) => void;
    enter?: (param: EffectSourceParam<AudioPlayerSegment>) => void;
    leave?: (param: EffectSourceParam<AudioPlayerSegment>) => void;
    stop?: (param: EffectSourceParam<AudioPlayerSegment>) => void;
    load?: (param: EffectSourceParam<AudioPlayerSegment>) => void;
  };
}

const audioPlayerEffect: AudioPlayerEffect = {
  id: "audioPlayer",
  name: "audioPlayer",
  source: {
    start: ({ segment, engine, isPlaying, time }) => {
      if (isPlaying) {
        const src = segment.data.src;
        const id = segment.id;
        const isLargefile = segment.data.isLargefile;
        audioControl.start({
          id,
          src,
          startTime: segment.start,
          startOffset: segment.data.startOffset,
          engine,
          time,
          isLargefile,
        });
      }
    },
    enter: ({ segment, engine, isPlaying, time }) => {
      if (isPlaying) {
        const src = segment.data.src;
        const id = segment.id;
        audioControl.start({
          id,
          src,
          startTime: segment.start,
          startOffset: segment.data.startOffset,
          engine,
          time,
        });
      }
    },
    leave: ({ segment, engine }) => {
      const id = segment.id;
      audioControl.stop({ id: id, engine });
    },
    stop: ({ segment, engine }) => {
      const id = segment.id;
      audioControl.stop({ id: id, engine });
    },
    load: ({ segment, engine }) => {
      const src = segment.data.src;
      const id = segment.id;
      audioControl.load({ id: id, src, engine });
    },
  },
};

export const AudioPlayerEffect = {
  audioPlayer: audioPlayerEffect,
};
