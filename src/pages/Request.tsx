import {css} from "@emotion/react";
import HttpRequest from "../components/http/Request";


const RequestPage = () => {
  return <div css={css`
  background-color: antiquewhite;height: 1500px`}>
    <HttpRequest></HttpRequest>
  </div>;
};

export default RequestPage;
