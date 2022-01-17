import {
    Flex,
    Text,
    Button,
    Box,
    Image,
    Badge,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';

import { LinkIcon } from '@chakra-ui/icons';
  
  function Card(props: any) {
    const toast = useToast()
    return (
        <Flex display={props.deals[props.i].display} p={50} alignItems="center" justifyContent="center" position='relative'>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW={320}
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
            >
                <Image
                    onClick={() => window.open(props.deals[props.i].url, "_blank")}
                    cursor='pointer'
                    src={props.deals[props.i].thumbnailUrl ? props.deals[props.i].thumbnailUrl : require("../amazon.png")}
                    alt={`Picture of ${props.deals[props.i].title}`}
                    roundedTop="lg"
                />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                    {props.deals[props.i].type ? (
                        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme={props.deals[props.i].type === 'Deal Of The Day' ? "blue" : props.deals[props.i].type === 'Lightning Deal' ? "yellow" : "green"}>
                            {props.deals[props.i].type ? props.deals[props.i].type : ''}
                        </Badge>
                    ) : <></>}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                        onClick={() => window.open(props.deals[props.i].url, "_blank")}
                        cursor='pointer'
                        fontSize="2xl"
                        fontWeight="semibold"
                        as="h4"
                        isTruncated
                        lineHeight="tight"
                        >
                        {props.deals[props.i].title}
                    </Box>
                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center">
                    <Box fontSize="2xl" justifyContent="flex-end" color={useColorModeValue('gray.800', 'white')}>
                        <Box as="span" color={'gray.600'} fontSize="lg">
                            {props.deals[props.i].timeLeft}
                        </Box>
                        <Flex direction='row' justifyContent='space-between'>
                            <Text>{props.deals[props.i].maxPrice ? "$" + props.deals[props.i].minPrice + " - " + props.deals
                            [props.i].maxPrice : "$" + props.deals[props.i].newPrice + " (-" + props.deals[props.i].discountPercentage + "%)"}</Text>
                            <Button onClick={() => {
                                navigator.clipboard.writeText(props.deals[props.i].url)
                                toast({
                                    title: 'Success',
                                    description: "Deal URL copied to clipboard.",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            }}>
                                <LinkIcon/>
                            </Button>
                        </Flex>
                    </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
  }
  
  export default Card;