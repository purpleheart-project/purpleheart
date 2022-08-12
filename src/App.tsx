import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'antd';
const Msg = styled.div`
  background-color: skyblue;
`;
function App() {
  return (
    <div
      css={css`
        background-color: rebeccapurple;
      `}
    >
      <Button>你好呀</Button>
    </div>
  );
}

export default App;
