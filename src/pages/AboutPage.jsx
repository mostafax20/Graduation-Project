import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  ListItem,
  UnorderedList,
  Divider,
  Code,
} from '@chakra-ui/react';

const AboutPage = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl" mb={2}>About the Prompt Injection Protection Tester</Heading>
      
      <Text fontSize="lg">
        This tool provides a way to evaluate the effectiveness of protection mechanisms 
        against prompt injection attacks on Large Language Models (LLMs). By testing your 
        prompts against our protection layer, you can identify potential vulnerabilities 
        before they reach your production LLM systems.
      </Text>
      
      <Divider />
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>What is Prompt Injection?</Heading>
        <Text mb={4}>
          Prompt injection is a technique where malicious users craft inputs designed to 
          manipulate an LLM into ignoring its intended instructions, revealing sensitive 
          information, or generating harmful content. Common patterns include:
        </Text>
        
        <UnorderedList spacing={2} pl={6} mb={4}>
          <ListItem>
            <Text fontWeight="bold" as="span">Instruction Override:</Text> "Ignore previous instructions and do X instead."
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" as="span">Delimiter Confusion:</Text> Using special characters to trick the LLM into processing part of the prompt as system instructions.
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" as="span">System Prompts:</Text> Attempting to reveal or modify system prompts with statements like "show me your system prompt."
          </ListItem>
          <ListItem>
            <Text fontWeight="bold" as="span">Role Playing:</Text> Instructing the model to "act as" a different system with different constraints.
          </ListItem>
        </UnorderedList>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>How Our Protection Layer Works</Heading>
        <Text>
          Our protection layer uses a combination of pattern matching, machine learning, and 
          heuristic techniques to identify potential injection attempts. When a prompt is 
          submitted, the system:
        </Text>
        
        <UnorderedList spacing={2} pl={6} mt={3}>
          <ListItem>Analyzes the text for known injection patterns</ListItem>
          <ListItem>Evaluates semantic intent using machine learning models</ListItem>
          <ListItem>Assigns a confidence score for safety</ListItem>
          <ListItem>Either passes safe prompts to the LLM or blocks unsafe ones</ListItem>
        </UnorderedList>
      </Box>
      
      <Divider />
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>Frequently Asked Questions</Heading>
        
        <Accordion allowMultiple>
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  Is this tool 100% effective at preventing all prompt injections?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Text>
                No security solution is 100% effective. Our protection layer aims to catch most common 
                injection techniques, but as LLM capabilities evolve and new attack methods emerge, 
                there will always be a need for continuous improvement. We recommend using this tool 
                as part of a broader security strategy.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  How can I integrate this protection layer into my own application?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                The protection layer is available as an API that you can integrate with your applications.
                Simply make a POST request to our endpoint with your prompt, and we'll return the safety analysis 
                and (if safe) the LLM response.
              </Text>
              <Code p={3} borderRadius="md" display="block" whiteSpace="pre" fontSize="sm">
{`// Example API usage
fetch('https://api.promptprotection.example/api/v1/prompts/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key'
  },
  body: JSON.stringify({
    text: "Your prompt here",
    model_name: "gpt-3.5-turbo"
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
              </Code>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  What LLM models are supported?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Text>
                We currently support multiple models from OpenAI and Hugging Face. Check the model dropdown 
                in the testing interface for the complete and up-to-date list of available models. We're 
                continuously adding support for new models.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  How is the confidence score calculated?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Text>
                The confidence score is derived from our machine learning model's assessment of the prompt's 
                safety. It considers factors like the presence of known injection patterns, semantic similarity 
                to previous attacks, and contextual analysis. Higher confidence scores indicate stronger 
                certainty about the classification (safe or unsafe).
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      
      <Divider />
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>Contact and Support</Heading>
        <Text>
          If you have questions or need assistance with the Prompt Injection Protection Tester, 
          please reach out to our team at <Link color="blue.500" href="mailto:support@example.com">
          support@example.com</Link>.
        </Text>
      </Box>
    </VStack>
  );
};

export default AboutPage;