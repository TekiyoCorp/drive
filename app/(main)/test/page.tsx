"use client";

import { ScrollSnap } from "@/components/global/scroll-snap";
import { Box, ContentBox } from "./box";

export default function App() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <ScrollSnap>
        <Box full color="#FDD692">
          Box 1 (full)
        </Box>
        <Box half triggerOnce transLeft color="#C5E99B">
          Box 2 (half)
        </Box>
        <Box full color="#84B1ED">
          Box 3 (full)
        </Box>
        <Box half triggerOnce transLeft color="#67D5B5">
          Box 4 (half)
        </Box>
        <Box full color="#FDD692">
          Box 5 (full)
        </Box>
        <ContentBox />
        <Box full color="#84B1ED">
          Box 6 (full)
        </Box>
      </ScrollSnap>
    </div>
  );
}
