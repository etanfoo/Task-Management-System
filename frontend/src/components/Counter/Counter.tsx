import { useEffect, useState } from "react";
import { CounterContainer } from "./style";

type CounterProps = {
  stat: string;
  finalValue: number;
  inView: boolean;
  innerRef: (node?: Element | null | undefined) => void;
};

const Counter = ({ stat, finalValue, inView, innerRef }: CounterProps) => {
  const [count, setCount] = useState<number>(0);
  
  const INTERVAL = 750;
  const duration = Math.floor(INTERVAL / finalValue);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === finalValue) clearInterval(timer);
    }, duration);

  }, [duration, finalValue, inView])
  
  return (
    <CounterContainer ref={innerRef}>
      <h3>{count}</h3>
      <p>{stat}</p>
    </CounterContainer>
  );
};

export default Counter;