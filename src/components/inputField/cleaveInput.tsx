import Cleave from 'cleave.js/react';

function CleaveInput(props: any) {
  const { inputRef, ...rest } = props;

  return (     
      <Cleave
        ref={inputRef}        
        options={{
          delimiters: ['(', ')', '-'],
          blocks: [0, 2, 5, 4],
          numericOnly: true
        }}
        {...rest}        
      />
  );
}

export default CleaveInput;