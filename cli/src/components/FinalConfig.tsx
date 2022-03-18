import { Box, Newline, Text, useInput } from "ink";
import React from "react";
import { Config } from "../types";

const FinalConfig = (p: {
  periphery: boolean | undefined;
  config: Config;
  onConfirm: () => void;
}) => {
  useInput((_, key) => {
    if (key.return) p.onConfirm();
  });
  if (p.periphery) {
    return (
      <Text>
        press{" "}
        <Text color="green" bold>
          enter
        </Text>{" "}
        to start setup of the <Text color="red">monitor periphery</Text>. you
        cannot go back after this begins.
      </Text>
    );
  } else {
    return (
      <Box flexDirection="column">
        <Text color="blue" bold>
          your monitor core config
        </Text>
        <Newline />
        <Box flexDirection="column" borderColor="green" borderStyle="round">
          <Text>
            mongo url:{" "}
            <Text color="green" bold>
              {p.config.mongoURL}
            </Text>
          </Text>
          <Text>
            use builds:{" "}
            <Text color={p.config.useBuilds ? "green" : "red"} bold>
              {p.config.useBuilds ? "yes" : "no"}
            </Text>
          </Text>
        </Box>
        <Newline />
        <Text>
          press{" "}
          <Text color="green" bold>
            enter
          </Text>{" "}
          to start setup of <Text color="cyan">monitor core</Text>. you cannot
          go back after this begins.
        </Text>
      </Box>
    );
  }
};

export default FinalConfig;
