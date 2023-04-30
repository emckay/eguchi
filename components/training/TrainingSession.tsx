import { Feedback } from "@/components/Feedback";
import { chords as ALL_CHORDS, Chord } from "@/shared-lib/chords";
import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { capitalize, cloneDeep, keyBy, mapValues, sample } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { MidiNumbers, Piano } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";
import { TrainingSessionOptions } from "./Options";

type Props = {
  options: TrainingSessionOptions;
  onDone: (results: Required<TrialResult>[]) => void;
};

export type TrialResult = {
  correctChord: Chord;
  guessedChord?: Chord;
};

type IncorrectFeedback = {
  correct: false;
  correctChord: Chord;
};

type CorrectFeedback = { correct: true };

type Feedback = IncorrectFeedback | CorrectFeedback;

const isDone = (results: TrialResult[]): results is Required<TrialResult>[] => {
  return results.every((r) => !!r.guessedChord);
};

export const TrainingSession = (props: Props) => {
  const {
    chords: isChordSelected,
    showPiano,
    playChordSounds,
    playFeedbackSounds,
    numTrials,
  } = props.options;
  const chords = useMemo(
    () => ALL_CHORDS.filter((_, i) => isChordSelected[i]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(isChordSelected)]
  );
  const [results, setResults] = useState<TrialResult[]>(() => [
    { correctChord: sample(chords)! },
  ]);
  const [feedback, setFeedback] = useState<Required<TrialResult> | null>(null);

  const [audios, setAudios] = useState<{
    wrong: { [key: string]: HTMLAudioElement };
    right: { [key: string]: HTMLAudioElement };
  }>({ wrong: {}, right: {} });

  useEffect(() => {
    const right = mapValues(
      keyBy(chords, "id"),
      (c) => new Audio(`/sounds/feedback/right-${c.colorName}.mp3`)
    );
    const wrong = mapValues(
      keyBy(chords, "id"),
      (c) => new Audio(`/sounds/feedback/wrong-${c.colorName}.mp3`)
    );
    Object.values(wrong).forEach((a) => a.load());
    Object.values(right).forEach((a) => a.load());
    setAudios({ wrong, right });
  }, [chords]);

	const playTone = async (notes: string[]) => {
		const synth = new Tone.PolySynth().toDestination();
		synth.triggerAttackRelease(notes, "2n");
	};

  useEffect(() => {
    // play initial tone
    playTone(results[0].correctChord.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = (guessedChord?: Chord) => {
    const newResults = cloneDeep(results);
    let showingFeedback = false;
    // Process last guess.
    if (guessedChord && newResults.length > 0) {
      // Update results
      const lastResultWithoutGuess = newResults[newResults.length - 1];
      const lastResult = {
        ...lastResultWithoutGuess,
        guessedChord: guessedChord,
      };
      newResults[newResults.length - 1] = lastResult;

      // Show feedback.
      showingFeedback = true;
      setFeedback(lastResult);

      // Play feedback audio.
      if (playFeedbackSounds) {
        if (lastResult.correctChord.id !== lastResult.guessedChord.id) {
          audios.wrong[lastResult.correctChord.id].play();
        } else {
          audios.right[lastResult.correctChord.id].play();
        }
      }
    }

    if (newResults.length === numTrials) {
      setResults(newResults);
      // We're done.
      return;
    }

    // Generate next chord.
    const nextChord = sample(chords)!;
    newResults.push({ correctChord: nextChord });
    setResults(newResults);
    if (!showingFeedback && playChordSounds) {
      playTone(nextChord.notes);
    }
  };

  const currentChord = results[results.length - 1]?.correctChord;

  const onDismissFeedback = () => {
    setFeedback(null);
    if (!isDone(results) && playChordSounds) {
      playTone(currentChord.notes);
    }
    if (isDone(results)) {
      return props.onDone(results as Required<TrialResult>[]);
    }
  };

  return (
    <>
      {feedback ? (
        <Feedback trialResult={feedback} onDismiss={onDismissFeedback} />
      ) : (
        <Flex flexWrap="wrap" gap={2}>
          {showPiano && (
            <Box width={"100%"} height={"150px"}>
              <Piano
                noteRange={{
                  first: MidiNumbers.fromNote("c3"),
                  last: MidiNumbers.fromNote("f5"),
                }}
                activeNotes={currentChord.notes.map((n) =>
                  MidiNumbers.fromNote(n)
                )}
                playNote={() => {}}
                stopNote={() => {}}
              />
            </Box>
          )}
          <Flex gap={3} justifyContent="center" flexWrap="wrap">
            {chords.map((c) => (
              <Button
                bgColor={c.themeColor}
                sx={{
                  "@media(hover: none)": {
                    _hover: {
                      bgColor: c.themeColor,
                    },
                  },
                }}
                color={c.textColor}
                key={c.id}
                onClick={() => handleNext(c)}
                width="150px"
                height="150px"
              >
                {capitalize(c.colorName)}
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};
