import React from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { MenuTypeEnum, PageTypeEnum } from '../constant';

type UserInfo = {
  email: string | null;
  profile: {
    background: string;
    accentColor: string;
    fontSize: string;
    language: string;
  };
};

// TODO 数据结构待规范
export type PaneType = {
  title: string;
  key: string;
  menuType?: MenuTypeEnum;
  pageType: PageTypeEnum;
  isNew?: boolean;
};

type BaseState = {
  extensionInstalled: boolean;
  userInfo?: UserInfo;
  logout: () => void;

  activePane: string;
  setActivePane: (key: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  activeMenu: [MenuTypeEnum, string | undefined]; // [菜单id, 菜单项目id]
  setActiveMenu: (menuKey: MenuTypeEnum, menuItemKey?: string) => void;
  panes: PaneType[];

  /*
   * 修改工作区标签页数据
   * @param panes 工作区标签页数据
   * @param mode 添加模式：push，替换模式：undefined
   * */
  setPanes: (panes: PaneType | PaneType[], mode?: 'push') => void;
  resetPanes: () => void;
  collectionTreeData: any;
  setCollectionTreeData: (collectionTreeData: any) => void;

  workspaces: any[];
  setWorkspaces: (workspaces: any[]) => void;

  environmentTreeData: any;
  setEnvironmentTreeData: (environmentTreeData: any) => void;

  environment: string;
  setEnvironment: (environment: any) => void;
};

/**
 * TODO 全局store模块拆分
 * 1. 用户信息，用户配置等相关
 * 2. 主菜单/工作区（MainBox）相关
 * 3. ......
 */

export const useStore = create(
  immer<BaseState>((set, get) => ({
    userInfo: {
      email: localStorage.getItem('email'),
      profile: {
        background: 'light',
        accentColor: '#603BE3',
        fontSize: 'small',
        language: 'english',
      },
    },
    setUserInfo: (userInfo: BaseState['userInfo']) => set({ userInfo }),

    extensionInstalled: false,

    activePane: '',
    setActivePane: (key: string) => {
      set({ activePane: key });
    },

    panes: [],
    setPanes: (panes, mode) => {
      if (!mode) {
        set({ panes: panes as PaneType[] });
      }

      if (mode === 'push') {
        // immer push new pane and set activePane
        const pane = panes as PaneType;
        set((state) => {
          if (!state.panes.find((i) => i.key === pane.key)) {
            state.panes.push(pane);
          }
          state.activePane = pane.key;
        });
      }
    },
    activeMenu: [MenuTypeEnum.Collection, undefined],
    setActiveMenu: (menuKey, menuItemKey) => {
      set({ activeMenu: [menuKey, menuItemKey] });
    },
    resetPanes: () => {
      set({ panes: [], activePane: '', activeMenu: [MenuTypeEnum.Collection, undefined] });
    },

    logout: () => {
      localStorage.removeItem('email');
      set({ userInfo: undefined, panes: [], activePane: '' });
    },

    collectionTreeData: [],
    setCollectionTreeData: (collectionTreeData) => set({ collectionTreeData }),

    workspaces: [],
    setWorkspaces: (workspaces) => set({ workspaces }),

    environmentTreeData: [],
    setEnvironmentTreeData: (environmentTreeData) => set({ environmentTreeData }),

    environment: '0',
    setEnvironment: (environment) => set({ environment }),
  })),
);
