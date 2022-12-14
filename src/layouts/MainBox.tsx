import { ApiOutlined, DeploymentUnitOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { Button, Divider, Empty, Select, SelectProps, TabPaneProps, Tabs, TabsProps } from 'antd';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import CollectionMenu from '../components/collection';
import EnvironmentMenu from '../components/environment';
import Environment from '../components/environment';
import { MenuTypeEnum, PageTypeEnum } from '../constant';
import EnvironmentPage from '../panes/Environment';
import FolderPage from '../panes/Folder';
import RequestPage from '../panes/Request';
import WorkspacePage from '../panes/Workspace';
import { useStore } from '../store';
import DraggableLayout from './DraggableLayout';

const { Option } = Select;
const { TabPane } = Tabs;
const MainMenu = styled(Tabs)`
  height: 100%;
  .ant-tabs-nav-list {
    width: 100px;
    .ant-tabs-tab {
      margin: 0 !important;
      padding: 12px 0 !important;
      .ant-tabs-tab-btn {
        margin: 0 auto;
      }
    }
    // .ant-tabs-tab-active {
    // }
    .ant-tabs-ink-bar {
      left: 0;
    }
  }
  .ant-tabs-content {
    height: 100%;
  }
`;

type MainMenuItemProps = TabPaneProps & { menuItem: ReactNode };
const MainMenuItem = styled((props: MainMenuItemProps) => (
  <TabPane {...props}>{props.menuItem}</TabPane>
))<MainMenuItemProps>`
  padding: 0 8px !important;
  .ant-tree-node-selected {
  }
`;

type MenuTitleProps = { title: string; icon?: ReactNode };
const MenuTitle = styled((props: MenuTitleProps) => (
  <div {...props}>
    <i>{props.icon}</i>
    <span>{props.title}</span>
  </div>
))<MenuTitleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    width: 14px;
    height: 24px;
  }
`;

const MainTabs = styled((props: TabsProps) => (
  <Tabs
    size='small'
    type='editable-card'
    tabBarGutter={-1}
    tabBarStyle={{
      left: '-11px',
      top: '-1px',
    }}
    {...props}
  >
    {props.children}
  </Tabs>
))<TabsProps>`
  height: 100%;
  .ant-tabs-tab-with-remove {
    padding: 6px 12px !important;
    // ??????????????? tabs-ink-bar
    // ????????????????????????????????????????????????????????????????????????????????????????????????????????? Tab
    // .ant-tabs-tab-with-remove ????????????????????????????????? Tabs
    &.ant-tabs-tab-active:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transition: all 0.2s ease-in-out;
    }
    .ant-tabs-tab-remove {
      margin-left: 0;
      padding-right: 0;
    }
  }
  .ant-tabs-content-holder {
    overflow: auto;
  }
  .ant-tabs-nav-more {
    height: 36px;
    border-left: #000c17 1px solid;
  }
`;

const EnvironmentSelect = styled((props: SelectProps) => (
  <Select allowClear bordered={false} {...props} />
))`
  height: 36px;
  width: 150px;
  box-sizing: content-box;
  margin-left: -1px;
  .ant-select-selector {
    height: 100%;
    .ant-select-selection-item {
      line-height: 34px;
    }
  }
`;

const MainTabPane = styled((props: TabPaneProps) => (
  <TabPane {...props}>{props.children}</TabPane>
))<TabPaneProps>`
  padding: 0 8px;
  overflow: auto;
`;

const EmptyWrapper = styled(
  (props: { empty: boolean; emptyContent: ReactNode; children: ReactNode }) => {
    const { empty, emptyContent, children, ...restProps } = props;
    return <div {...restProps}>{empty ? <Empty>{emptyContent}</Empty> : children}</div>;
  },
)`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const MainBox = () => {
  const {
    panes,
    setPanes,
    activePane,
    setActivePane,
    activeMenu,
    setActiveMenu,
    environment,
    environmentTreeData,
    setEnvironment,
    setEnvironmentTreeData,
    setCollectionTreeData,
  } = useStore();

  const addTab = () => {
    const newActiveKey = String(Math.random());
    setPanes(
      {
        key: newActiveKey,
        title: 'New Request',
        pageType: PageTypeEnum.Request,
        menuType: MenuTypeEnum.Collection,
        isNew: true,
      },
      'push',
    );
  };

  const removeTab = (targetKey: string) => {
    const menuType = activeMenu[0];
    const filteredPanes = panes.filter((i) => i.key !== targetKey);
    setPanes(filteredPanes);

    if (filteredPanes.length) {
      const lastPane = filteredPanes[filteredPanes.length - 1];
      const lastKey = lastPane.key;
      setActivePane(lastKey);
      setActiveMenu(lastPane.menuType || MenuTypeEnum.Collection, lastKey);
    } else {
      setActiveMenu(menuType);
    }
  };

  const handleTabsEdit: any = (targetKey: string, action: 'add' | 'remove') => {
    action === 'add' ? addTab() : removeTab(targetKey);
  };

  const handleTabsChange = (activePane: string) => {
    const pane = panes.find((i) => i.key === activePane);
    setActivePane(activePane);
    setActiveMenu(pane?.menuType || MenuTypeEnum.Collection, activePane);
  };

  const handleCollectionMenuClick = (key, node) => {
    setActiveMenu(MenuTypeEnum.Collection, key);
    setPanes(
      {
        key,
        title: node.title,
        menuType: MenuTypeEnum.Collection,
        pageType: node.nodeType === 3 ? PageTypeEnum.Folder : PageTypeEnum.Request,
        isNew: false,
      },
      'push',
    );
  };

  return (
    <>
      {/*AppHeader??????*/}
      <AppHeader workspaces={[]} userinfo={{}} />
      <DraggableLayout
        firstNode={
          <div
            css={css`
              height: calc(100vh - 72px);
              overflow-y: auto;
            `}
          >
            <MainMenu
              tabPosition='left'
              activeKey={activeMenu[0]}
              onChange={(key) => setActiveMenu(key as MenuTypeEnum)}
              items={[
                {
                  label: <MenuTitle icon={<ApiOutlined />} title='Collection' />,
                  key: MenuTypeEnum.Collection,
                  children: (
                    <CollectionMenu value={activeMenu[1]} onSelect={handleCollectionMenuClick} />
                  ),
                },
              ]}
            >
              {/* menuItem ??????????????????????????????: XxxMenu, ??????xx???????????????????????? */}
              {/* menuItem ?????????????????? props ???????????????????????????  */}
              {/* 1. ref?: ??????ref???????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
              {/* 1. xxId?: ??????????????????????????????id????????????????????????????????????????????????????????? */}
              {/* 2. onSelect: ?????? menu item ???????????????????????????????????????????????????????????????????????????????????????????????? Menu ??????????????? */}
              {/*<MainMenuItem*/}
              {/*  tab={<MenuTitle icon={<ApiOutlined />} title='Collection' />}*/}
              {/*  key={MenuTypeEnum.Collection}*/}
              {/*  menuItem={*/}
              {/*    <CollectionMenu value={activeMenu[1]} onSelect={handleCollectionMenuClick} />*/}
              {/*  }*/}
              {/*/>*/}
              {/*<MainMenuItem*/}
              {/*  tab={<MenuTitle icon={<DeploymentUnitOutlined />} title='Environment' />}*/}
              {/*  key={MenuTypeEnum.Environment}*/}
              {/*  menuItem={<EnvironmentMenu />}*/}
              {/*/>*/}
            </MainMenu>
          </div>
        }
        secondNode={
          <div
            css={css`
              height: calc(100vh - 72px);
              overflow-y: auto;
            `}
          >
            <MainTabs
              onEdit={handleTabsEdit}
              activeKey={activePane}
              onChange={handleTabsChange}
              tabBarExtraContent={
                <EnvironmentSelect
                  value={environment}
                  onChange={(e) => {
                    setEnvironment(e);
                  }}
                >
                  <Option value='0'>No Environment</Option>
                  {environmentTreeData?.map((e: { id: string; envName: string }) => {
                    return (
                      <Option key={e.id} value={e.id}>
                        {e.envName}
                      </Option>
                    );
                  })}
                </EnvironmentSelect>
              }
            >
              {panes.map((pane) => (
                <MainTabPane className='main-tab-pane' tab={pane.title} key={pane.key}>
                  {/* TODO ?????????????????????????????????????????? menuItem */}
                  {pane.pageType === PageTypeEnum.Request && <RequestPage id={pane.key} />}
                  {pane.pageType === PageTypeEnum.Folder && <FolderPage />}
                  {pane.pageType === PageTypeEnum.Environment && <EnvironmentPage />}
                  {pane.pageType === PageTypeEnum.Workspace && <WorkspacePage />}
                </MainTabPane>
              ))}
            </MainTabs>
          </div>
        }
        direction={'horizontal'}
        limitRange={[15, 40]}
      />
      <AppFooter />
    </>
  );
};

export default MainBox;
