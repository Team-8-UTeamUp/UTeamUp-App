import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Rank() {
  const rankSize = 5; // Define the size or number of ranks you want to display

  // Create an array with length of rankSize and fill it to map over
  // The fill() is necessary because map() doesn't work on empty elements
  const ranks = Array(rankSize).fill(null);

  return (
    <div className="rank">
      <div className="ranktitle">My Top {rankSize}</div>
      {
        ranks.map((_, index) => (
          <div className="ranknumber" key={index}>
            <div className="numbertile">{index + 1}</div>
            <input className="inputrank" type="text" id={`choice${index}`}/>
          </div>
        ))
      }
    </div>
  );
}

export default Rank;