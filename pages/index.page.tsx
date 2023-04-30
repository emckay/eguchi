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
import * as Tone from "tone";
import {
  Alert,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
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
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Eguchi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <VStack py={4} spacing={10} alignItems="stretch">
          <NavBar />
          {state === "options" ? (
            <>
              <Options
                initialOptions={options || defaultOptions}
                onSave={async (o) => {
                  await Tone.start();
									await Tone.loaded();
                  setState("training");
                  setOptions(o);
                }}
              />
              <Flex flexDirection="column" gap={3}>
                <Heading size="lg" mb={2}>
                  What is this?
                </Heading>
                <Text>
                  The Eguchi Method is an obscure method that, according to{" "}
                  <Link
                    href="https://doi.org/10.1177/0305735612463948"
                    color="teal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    a scientific study
                  </Link>
                  , has a 90% success rate in teaching children aged 2-6
                  absolute pitch (also known as perfect pitch).
                </Text>
                <Text>
                  The Eguchi method teaches children to identify chords by
                  associating them with colors. In the literature, the trainer
                  plays the chord on the piano and the child holds up a colored
                  flag representing the chord. For example, the trainer plays
                  C-major, and the child holds up a red flag.
                </Text>
                <Text>
                  After identifying 9 {'"'}white key{'"'} chords with perfect
                  accuracy, the child is then introduced to {'"'}black key{'"'}{" "}
                  chords and taught to break down the chords into individual
                  notes. According to the research, this results in absolute
                  pitch abilities that needs a small amount of regular practice
                  to maintain.
                </Text>
                <Text>
                  I could not find any software built in the last 10+ years that
                  is based on this method, so I put together this simple web app
                  to try it with my own children. This very basic initial
                  version does not implement any progression or tracking, but I
                  may add these features in the future.
                </Text>
                <Text>
                  A child may practice the Eguchi method by working directly on
                  the app, or if the parent has a piano handy, you can turn off
                  the sounds and show the chords on a piano on the screen to
                  train in the traditional way.
                </Text>
                <Text>
                  Enjoy! Please shoot me a DM on{" "}
                  <Link href="https://twitter.com/eric__mckay" color="teal">
                    Twitter
                  </Link>{" "}
                  if you have questions or feedback!
                </Text>
              </Flex>
            </>
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
