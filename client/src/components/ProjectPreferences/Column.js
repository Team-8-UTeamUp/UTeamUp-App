import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <Flex rounded="10px" bg="column1-bg" w="400px" h="620px" flexDir="column"
    outline="1px solid"
    outlineColor="column-border">
      <Flex /*column header*/
        align="center"
        h="60px"
        bg="column-header-bg"
        rounded="10px 10px 0 0"
        px="1.5rem"
        mb="1.5rem"
        justify="center" // text centered


      >
        <Text fontSize="17px" fontWeight={600} color="white" textAlign="center">
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id} /* expects dropable id*/>
        {(droppableProvided, droppableSnapshot) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index} >
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    mb="1rem"
                    h="72px"
                    bg="card-bg"
                    rounded="3px"
                    p=".5rem"
                    outline="2px solid"
                    outlineColor={
                      draggableSnapshot.isDragging
                        ? "card-border"
                        : "transparent"
                    }
                    boxShadow={
                      draggableSnapshot.isDragging
                        ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                        : "unset"
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text alignItems = "center" justifyContent = "center" fontSize="14px">{task.content}</Text>
                  </Flex>
                )}
              </Draggable>
            ))}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
