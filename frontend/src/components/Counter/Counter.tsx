type CounterProps = {
  finalValue: number;
  trigger: boolean;
  innerRef: (node?: Element | null | undefined) => void;
};

const Counter = ({ finalValue, trigger, innerRef }: CounterProps) => {
  return (
    <div ref={innerRef} style={{ textAlign: 'left', margin: '0', fontSize: '5rem', borderLeft: '1px solid white', padding: '0 0 0 1rem' }}>
      {trigger ? finalValue : 'nope' }
      {trigger}
    </div>
  )
};

export default Counter;