import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Rank({ onRankChange }) {
  const rankSize = 5; // Define the size or number of ranks you want to display

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    onRankChange(index, value); // Pass the updated rank value to the parent component
  };

  // Create an array with length of rankSize and fill it to map over
  // The fill() is necessary because map() doesn't work on empty elements
  const ranks = Array(rankSize).fill(null);

  return (
    <div className="list">
      <div className="listtitle">My Top {rankSize}</div>
      {ranks.map((_, index) => (
        <div className="listnumber" key={index}>
          <div className="numbertile">{index + 1}</div>
          <input
            className="inputrank"
            type="text"
            id={`choice${index}`}
            onChange={(event) => handleInputChange(index, event)} // Call handleInputChange when input changes
          />
        </div>
      ))}
    </div>
  );
}

export default Rank;
