import { NavBar } from "@/components/NavBar";
import {
  Options,
  TrainingSessionOptions,
  defaultOptions,
} from "@/components/training/Options";
import { Results } from "@/components/training/Results";
import {
  TrainingSession,
  TrialResult,
} from "@/components/training/TrainingSession";
import { Alert, Container, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

type Props = {};

export default function TrainingPage(props: Props) {
  const [state, setState] = useState<"options" | "training" | "results">(
    "options"
  );
  const [options, setOptions] = useState<TrainingSessionOptions | null>(null);
  const [results, setResults] = useState<Required<TrialResult>[] | null>(null);

  return (
    <>
      <Head>
        <title>Eguchi Perfect Pitch</title>
        <meta
          name="description"
          content="Learn perfect pitch with the Eguchi method"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <VStack pt={4} spacing={10} alignItems="stretch">
          <NavBar />
          {state === "options" ? (
            <Options
              initialOptions={options || defaultOptions}
              onSave={(o) => {
                setState("training");
                setOptions(o);
              }}
            />
          ) : state === "training" && options ? (
            <TrainingSession
              onDone={(r) => {
                setState("results");
                setResults(r);
              }}
              options={options}
            />
          ) : state === "results" && results ? (
            <Results
              results={results}
              onRestart={() => {
                setState("options");
                setResults(null);
              }}
            />
          ) : (
            <Alert colorScheme="red">Error!</Alert>
          )}
        </VStack>
      </Container>
    </>
  );
}
