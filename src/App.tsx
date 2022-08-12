import styled from "@emotion/styled";
import {css} from "@emotion/react";
const Msg = styled.div`
  background-color: skyblue;
`
function App() {
    return <div css={css`background-color: rebeccapurple`}>
        123
    </div>
}

export default App
