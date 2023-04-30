import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { FormikControl } from "@/components/FormikControl";
import { NavBar } from "@/components/NavBar";
import { chords } from "@/shared-lib/chords";
import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { range } from "lodash";
import { useState } from "react";

type Props = {
	initialOptions: TrainingSessionOptions
  onSave: (options: TrainingSessionOptions) => void;
};

export type TrainingSessionOptions = {
  numTrials: number;
  showPiano: boolean;
  playFeedbackSounds: boolean;
  playChordSounds: boolean;
  chords: boolean[];
};
export const defaultOptions: TrainingSessionOptions = {
  numTrials: 20,
  showPiano: false,
  playFeedbackSounds: true,
  playChordSounds: true,
  chords: range(0, 9).map((n) => n < 3),
};

export const Options = (props: Props) => {
  const handleSubmit = (values: TrainingSessionOptions) => {
    props.onSave(values);
  };

  return (
    <VStack alignItems="stretch" spacing={5}>
      <Heading size="lg">Start a training session</Heading>
      <Formik onSubmit={handleSubmit} initialValues={props.initialOptions}>
        {(formik) => (
          <Form>
            <Flex flexDirection="column" gap={5}>
              <FormikControl
                name="numTrials"
                label="How many trials?"
                inputProps={{ type: "number" }}
              />
              <FormikControl
                inputType="checkbox"
                label="Show chords on piano?"
                name="showPiano"
              />
              <FormikControl
                inputType="checkbox"
                label="Play chord sounds"
                name="playChordSounds"
              />
              <FormikControl
                inputType="checkbox"
                label="Play feedback sounds"
                name="playFeedbackSounds"
              />
              <Box>
                <FormLabel>Chords</FormLabel>
                <Flex>
                  {chords.map((c, i) => (
                    <Button
                      key={i}
                      borderRadius={0}
                      variant="unstyled"
                      width="40px"
                      minWidth="40px"
                      height="40px"
                      p={0}
                      bgColor={c.themeColor}
                      onClick={() => {
                        const oldChords = formik.values.chords;
                        formik.setFieldValue("chords", [
                          ...oldChords.slice(0, i),
                          !oldChords[i],
                          ...oldChords.slice(i + 1),
                        ]);
                      }}
                    >
                      {formik.values.chords[i] ? (
                        <CheckIcon color={c.textColor} />
                      ) : (
                        <CloseIcon color={c.textColor} />
                      )}
                    </Button>
                  ))}
                </Flex>
              </Box>
              <Button type="submit" colorScheme="blue">
                Start
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
