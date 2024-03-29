import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Rank from "./Rank.js";
import theme from "./theme.js";
import dynamic from 'next/dynamic';
import "../../App.js";

const Column = dynamic(() => import("./Column.js"), { ssr: false }); // To make draggable

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

function Preference() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => { // on end of drag
    const { destination, source } = result;


    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      if(sourceCol.id === "column-1") {return} // first column resets uppon swap

        const newColumn = reorderColumnList(
          sourceCol,
          source.index,
          destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
  

    // If the user moves from one column to another
    // If moving from column 1 to 2, check if 5 tasks are already there
    
    if(sourceCol.id === "column-1" ){
      const col2TaskIds = Array.from(destinationCol.taskIds);
      
      if(col2TaskIds.length === 5)
      {return}

    }
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} theme={theme}>
      
      <Flex
        flexDir="column" 
        bg="main-bg" // background color
        minH="100vh" // view height
        w="full"     // full width
        color="white-text" // text color
        pb="2rem" // padding button
      >
        
      
      
        <Flex py="4rem" flexDir="column" align="center"> 
    
         
        </Flex>
        
        <Flex justify="space-between" px="10rem" /* houses columns*/>
        <Rank/>
        
          {state.columnOrder.map((columnId) => { // map column id order
            const column = state.columns[columnId]; // get col
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]); // map tasks

            return <Column key={column.id} column={column} tasks={tasks} />;
              
          })}
        </Flex>


      </Flex>
      
      

    </DragDropContext>


  );
}



const initialData = {
  tasks: {
    1: { id: 1, content: "Non-for-Profit Organization Facility Software - Dr. Ebru Cankaya" },
    2: { id: 2, content: "Dr. Eric Becker" },
    3: { id: 3, content: "Attendance System - Dr. John Cole" },
    4: { id: 4, content: "Intrusion Detection System (IDS) Using Machine Learning - Dr. Nhut Nguyen" },
    5: { id: 5, content: "Virtual TA - Dr. Pushpa Kumar" },
    6: { id: 6, content: "Dr. Sridhar Alagar" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "CS Projects",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "Ranking",
      taskIds: [],
    },
    
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-2", "column-1"],
};

export default Preference;
