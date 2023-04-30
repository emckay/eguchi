import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { sum } from "lodash";
import Confetti from "react-confetti";
import { TrialResult } from "./TrainingSession";

export const Results = (props: {
  onRestart: () => void;
  results: Required<TrialResult>[];
}) => {
  const { results } = props;
  const correctCount = sum(
    results.map((r) => r.correctChord.id === r.guessedChord.id)
  );

  return (
    <Box>
      <Confetti />
      <Flex flexDirection="column" gap={4} justifyContent="center">
        <Heading size="2xl" textAlign="center">
          Done!
        </Heading>
        <Heading size="lg" textAlign="center">
          {correctCount} / {results.length}
        </Heading>
        <Button colorScheme="blue" onClick={() => props.onRestart()}>Go again!</Button>
      </Flex>
    </Box>
  );
};
