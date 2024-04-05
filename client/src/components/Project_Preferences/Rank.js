import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Rank () {
return(

    <Flex rounded="10px" bg="column1-bg" w="100px" h="620px" flexDir="column"
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
      </Flex>

        <Flex
          px="1.5rem"
          flex={1}
          flexDir="column"
        >
          <Flex
                    textColor="gray"
                    mb="1rem"
                    h="72px"
                    bg="white"
                    rounded="3px"
                    p="1.5rem"
                    outline="1px solid"
                    outlineColor="gray">
                   
                <Text>1</Text>  
          </Flex>
          <Flex
                    textColor="gray"
                    mb="1rem"
                    h="72px"
                    bg="white"
                    rounded="3px"
                    p="1.5rem"
                    outline="1px solid"
                    outlineColor="gray">
                   
                <Text>2</Text>  
          </Flex>
          <Flex
                    textColor="gray"
                    mb="1rem"
                    h="72px"
                    bg="white"
                    rounded="3px"
                    p="1.5rem"
                    outline="1px solid"
                    outlineColor="gray">
                   
                <Text>3</Text>  
          </Flex>
          <Flex
                    textColor="gray"
                    mb="1rem"
                    h="72px"
                    bg="white"
                    rounded="3px"
                    p="1.5rem"
                    outline="1px solid"
                    outlineColor="gray">
                   
                <Text>4</Text>  
          </Flex>
          <Flex
                    textColor="gray"
                    mb="1rem"
                    h="72px"
                    bg="white"
                    rounded="3px"
                    p="1.5rem"
                    outline="1px solid"
                    outlineColor="gray">
                   
                <Text>5</Text>  
          </Flex>
    
      </Flex>  
    </Flex>
)
   

  return (
    <div className="list">
      <div className="listtitle">My Top {rankSize}</div>
      {
        ranks.map((_, index) => (
          <div className="listnumber" key={index}>
            <div className="numbertile">{index + 1}</div>
            <input className="inputrank" type="text" id={`choice${index}`}/>
          </div>
        ))
      }
    </div>
  );
}

export default Rank;