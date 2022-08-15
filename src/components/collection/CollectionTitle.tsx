import { MoreOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Dropdown, Input, Menu, Popconfirm, Space } from 'antd';
import { useState } from 'react';

import { methodMap } from '../../constant';
import { FileService } from '../../services/FileService';
import request from '../../services/request';

function CollectionTitle({ val, updateDirectoryTreeData, treeData, callbackOfNewRequest }: any) {
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const [renameKey, setRenameKey] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const menu = (val: any) => {
    return (
      <Menu
        onClick={(e) => {
          switch (e.key) {
            case '3':
              const params3 = {
                name: 'New Folder',
                nodeType: 3,
                pid: val.id,
              };
              FileService.createACollection(params3).then((res) => {
                console.log(res);
                updateDirectoryTreeData();
              });
              break;
            case '1':
              const params1 = {
                name: 'New Req',
                nodeType: 1,
                pid: val.id,
              };
              FileService.createACollection(params1).then((res) => {
                console.log(res);
                updateDirectoryTreeData();
              });
              break;
            case '2':
              const params2 = {
                name: 'New Ex',
                nodeType: 2,
                pid: val.id,
              };
              FileService.createACollection(params2).then((res) => {
                console.log(res);
                updateDirectoryTreeData();
              });
              break;
            case '4':
              setRenameKey(val.id);
              setRenameValue(val.name);
              break;
            case '6':
              break;
          }
          e.domEvent.stopPropagation();
          setVisible(false);
        }}
        items={[
          {
            key: '3',
            label: (
              //必须要用a标签，不然无法disable
              <span className={'dropdown-click-target'}>Add Folder</span>
            ),
            // 只有类型为3才能新增文件夹
            disabled: val.nodeType !== 3,
          },
          {
            key: '1',
            label: <span className={'dropdown-click-target'}>Add Request</span>,
            disabled: val.nodeType !== 3,
          },
          {
            key: '2',
            label: <span className={'dropdown-click-target'}>Add Case</span>,
            disabled: val.nodeType !== 1,
          },
          {
            key: '4',
            label: <span className={'dropdown-click-target'}>Rename</span>,
          },
          {
            key: '5',
            label: (
              <Popconfirm
                title='Are you sure？'
                okText='Yes'
                cancelText='No'
                onConfirm={() => {
                  FileService.deleteACollection({ id: val.id }).then((res) => {
                    console.log(res);
                    updateDirectoryTreeData();
                  });
                }}
              >
                <a style={{ color: 'red' }}>Delete</a>
              </Popconfirm>
            ),
          },
        ]}
      />
    );
  };
  return (
    <>
      <div className={'collection-title-render'}>
        <div className={'left'}>
          {val.nodeType === 1 && val.nodeType === 1 ? (
            <span
              css={css(`color:${methodMap[val.requestMethod || 'GET'].color};margin-right:4px`)}
            >
              {val.requestMethod}
            </span>
          ) : null}
          {val.nodeType === 2 ? (
            <span
              style={{
                color: '#5C4033',
                marginRight: '8px',
                border: '1px solid #5C4033',
                fontSize: '10px',
                display: 'block',
                lineHeight: '12px',
                transform: 'scale(.9)',
              }}
            >
              e.g.
            </span>
          ) : null}
          <div className={'content'}>
            {renameKey === val.id ? (
              <Input
                value={renameValue}
                onPressEnter={() => {
                  request({
                    method: 'PATCH',
                    url: `/api/file/${val.id}`,
                    data: {
                      name: renameValue,
                    },
                  }).then((res) => {
                    updateDirectoryTreeData();
                    setRenameKey('');
                    setRenameValue('');
                  });
                }}
                onChange={(val) => setRenameValue(val.target.value)}
              />
            ) : (
              <span>{val.title}</span>
            )}
          </div>
        </div>
        <div className='right'>
          <Dropdown
            overlay={menu(val)}
            trigger={['click']}
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <span onClick={(event) => event.stopPropagation()}>
              <Space>
                <MoreOutlined size={100} style={{ fontSize: '16px' }} />
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default CollectionTitle;
