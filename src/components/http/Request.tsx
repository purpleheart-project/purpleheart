import styled from "@emotion/styled";
import {Button, Input, Select} from "antd";
import {MethodEnum, METHODS} from "../../constant";
import {useState} from "react";

const HeaderWrapper = styled.div`
  display: flex;

  .ant-select > .ant-select-selector {
    width: 120px;
    left: 1px;
    border-radius: 2px 0 0 2px;
    .ant-select-selection-item {
      font-weight: 500;
    }
  }
  .ant-input {
    border-radius: 0 2px 2px 0;
  }
  .ant-btn-group,
  .ant-btn {
    margin-left: 16px;
  }
`;
const RequestTypeOptions = METHODS.map((method) => ({
  label: method,
  value: method,
}));
const HttpRequest = () => {
  const [method, setMethod] = useState<typeof METHODS[number]>(MethodEnum.GET);
  const [url, setUrl] = useState('');
  const handleUrlChange = (value: string) => {
    setUrl(value);
  };
  const handleRequest=()=>{
    console.log(123)
  }
  return <div>
    <HeaderWrapper>
      <Select value={method} options={RequestTypeOptions} onChange={setMethod} />
      <Input
        placeholder={'http.enterRequestUrl'}
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
      />
      <Button type='primary' onClick={handleRequest}>
        Send
      </Button>
    </HeaderWrapper>
  </div>
}

export default HttpRequest
