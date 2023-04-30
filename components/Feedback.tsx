import { Chord } from "@/shared-lib/chords";
import { Image } from "@chakra-ui/next-js";
import { Flex, Heading, Progress } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";

const DURATION = 2000;

export const Feedback = (props: {
  trialResult: { correctChord: Chord; guessedChord: Chord };
  onDismiss: () => void;
}) => {
  const { trialResult, onDismiss } = props;
  const correct =
    trialResult.correctChord.id === trialResult.guessedChord.id;
  const message = (
    <Flex flexDirection="column" gap={3} justifyContent="center">
      <Heading size="md" textAlign="center">
        {correct ? "Correct" : "Incorrect"}
      </Heading>
      <Flex gap={4} justifyContent="center" flexWrap="wrap">
        <Image
          src={`/images/${correct ? "happy" : "disappointed"}.png`}
          alt={`${correct ? "happy" : "disappointed"} face`}
          height={200}
          quality={100}
          width={200}
        />
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
          bgColor={trialResult.correctChord.themeColor}
          fontSize="lg"
          fontWeight="bold"
					color={trialResult.correctChord.textColor}
        >
          {capitalize(trialResult.correctChord.colorName)}
        </Flex>
      </Flex>
    </Flex>
  );

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const UPDATE_FREQ = 30;
    const interval = setInterval(() => {
      setProgress((old) => old + (UPDATE_FREQ / DURATION) * 100);
    }, UPDATE_FREQ);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress > 100) {
      onDismiss();
    }
  }, [progress, onDismiss]);

  return (
    <Flex flexDirection="column" gap={5}>
      {message}
      <Progress value={progress} />
    </Flex>
  );
};
