import { DownOutlined } from '@ant-design/icons';
import { useMount, useRequest } from 'ahooks';
import { Button, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import type { DirectoryTreeProps } from 'antd/lib/tree';
import axios from 'axios';
// import { DataNode } from 'antd/lib/tree';
// import { CollectionService } from '../../services/CollectionService';
import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { NodeType } from '../../constant';
import CollectionTitle from './CollectionTitle';

// import CollectionTitleRender from './CollectionTitleRender';
// import { arrToTree } from '../../helpers/collection/util';
export type nodeType = {
  title: string;
  key: string;
  nodeType: NodeType;
} & DataNode;
const CollectionMenu = ({ value, onSelect }) => {
  const selectedKeys = useMemo(() => (value ? [value] : []), [value]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const handleSelect: DirectoryTreeProps<nodeType>['onSelect'] = (keys, info) => {
    if (keys.length && onSelect) {
      onSelect(keys[0] as string, {
        title: info.node.title,
        key: info.node.key,
        nodeType: info.node.nodeType,
      });
    }
  };

  const {
    data: treeData = [],
    loading,
    run: fetchTreeData,
  } = useRequest(() => axios.get('/api/collection').then((res) => res.data), {
    onSuccess: (res) => {
      if (res.length) {
        console.log(res);
      }
    },
  });

  return (
    <div className={'collection'}>
      {JSON.stringify(treeData)}
      <Tree
        autoExpandParent
        blockNode={true}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpand={setExpandedKeys}
        onSelect={handleSelect}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        titleRender={(val) => (
          <CollectionTitle updateDirectoryTreeData={fetchTreeData} val={val} treeData={treeData} />
        )}
      />
    </div>
  );
};

export default CollectionMenu;
