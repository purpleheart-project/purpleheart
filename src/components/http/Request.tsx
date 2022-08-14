import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { Breadcrumb, Button, Input, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { MethodEnum, METHODS } from '../../constant';
import { treeFindPath } from '../../helpers/collection/util';
import request from '../../services/request';
import { useStore } from '../../store';

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
const HttpRequest = ({ id,pid, data }) => {
  console.log(data, 'data');
  const { collectionTreeData, extensionInstalled, setPanes } = useStore();
  // 如果是case(2)类型的话，就一定有一个父节点，类型也一定是request(1)
  const nodeInfoInCollectionTreeData = useMemo(() => {
    console.log({ pid, collectionTreeData });
    const paths = treeFindPath(collectionTreeData, (node) => node.key === pid);

    return {
      self: paths[paths.length - 1],
      parent: paths[paths.length - 2],
      raw: paths,
    };
  }, [collectionTreeData, pid]);
  const [method, setMethod] = useState<typeof METHODS[number]>(MethodEnum.GET);
  const [url, setUrl] = useState('');
  const handleUrlChange = (value: string) => {
    setUrl(value);
  };
  const handleRequest = () => {
    console.log(123);
  };

  useEffect(() => {
    setUrl(data.endpoint);
    setMethod(data.method);
  }, [data]);

  const { run: saveRequest } = useRequest(
    () => {
      return request({
        method: 'PATCH',
        url: `/api/request/${id}`,
        data: {
          method,
          endpoint:url,
        },
      });
    },
    {
      manual: true,
    },
  );

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Breadcrumb style={{ paddingBottom: '14px' }}>
          {nodeInfoInCollectionTreeData.raw.map((i, index) => (
            <Breadcrumb.Item key={index}>{i.title}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div>
          <Button onClick={()=>{saveRequest()}}>Save</Button>
        </div>
      </div>
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
  );
};

export default HttpRequest;
