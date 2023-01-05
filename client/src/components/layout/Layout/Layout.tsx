import * as React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Navbar/NavBar';
import { useNavigate } from "react-router-dom";
import { breadcrumbNameMap } from './breadcumbNameMap';

type MenuItem = Required<MenuProps>['items'][number];

const LayoutApp: React.FC<{nav?: boolean}> = (props) => {
  const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
        <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
    );
    });
    const { Header, Content, Footer, Sider } = Layout;
    const navigate = useNavigate();
    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[] | null,
        onClick?: React.ReactEventHandler
      ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            onClick
        } as MenuItem;
      }
    
    const items: MenuItem[] = [
        getItem('Home', '/home', <HomeOutlined />, null, () => navigate('/')),
        getItem('My Project', '/me/my-project', <PieChartOutlined />, null, () => navigate('/me/my-project')),
        getItem('My Task', '/me/my-task', <DesktopOutlined />, null, () => navigate('/me/my-task')),
        getItem('User', '/me/info', <UserOutlined />, [
            getItem('Info', 'me/info', null, null, () => navigate('/me/info')),
            getItem('New Project', 'me/create-project', null, null, () => navigate('/me/create-project')),
            getItem('New Task', 'me/create-task'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];

    const [collapsed, setCollapsed] = React.useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>,
      ].concat(extraBreadcrumbItems);
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" defaultSelectedKeys={['/home']} mode="inline" items={items} selectedKeys={[location.pathname,]}/>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer, position: "fixed", width: '100vw' }}>
            <NavBar/>
          </Header>
          <Content style={{ margin: '64px 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbItems}
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Outlet/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
}

export default LayoutApp