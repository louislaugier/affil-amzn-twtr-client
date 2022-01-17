import Card from "./components/Card";

import { SimpleGrid } from "@chakra-ui/react";

import { 
  useState, 
  useEffect 
} from "react";

import Error from "./components/Error";

function getRandomInt(min: number, max: number): number {
  const range = max - min + 1
  const bytes_needed = Math.ceil(Math.log2(range) / 8)
  const cutoff = Math.floor((256 ** bytes_needed) / range) * range
  const bytes = new Uint8Array(bytes_needed)
  let value
  do {
    crypto.getRandomValues(bytes)
    value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0)
  } while (value >= cutoff)
  return min + value % range
}

function Deals(props: any) {
  const [randomInt, setRandomInt] = useState(0)

  useEffect(() => {
    const fetchDeals = async () => {
      let r = await fetch("http://localhost:8080/deals?1=" + randomInt.toString(), {
      // let r = await fetch("https://api.allorigins.win/raw?url=https://amzn-twtr-affil.herokuapp.com/deals?1=" + randomInt.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      let res = await r.json();
      for (let i = 0; i < res.length; i++) {
        res[i].display = 'flex'
      }
      props.setDeals(res.reverse())
    }
    if (!props.deals.length) {
      fetchDeals()
    }
    if (!randomInt) {
      setRandomInt(getRandomInt(0, 256))
    }
  }, [props.deals.length, randomInt, setRandomInt])

  return (
    <>
      <SimpleGrid key={props.refresh} columns={[1, 1, 2, 3]} >
        {props.deals.length ? 
          props.deals.map((deal: any, i: number) => 
            <Card key={i} deals={props.deals} i={i}></Card>
          ) 
        : <></>}
      </SimpleGrid>
      {props.noResults ? 
        <Error/>
      : <></>}
    </>
  );
}
  
export default Deals;
  