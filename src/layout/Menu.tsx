import { useNavigate } from 'react-router-dom';
import { routes, Route } from '../routes'
import { Menu as AntdMenu } from 'antd';

const Menu = () => {
  const navigate = useNavigate()
  const onClick = (e: any) => {
    // 路由跳转
    navigate(e.key)
  }

  const renderRoutes = (routes: Route[]): any => {
    if (!routes) return [];

    return routes.map((route) => {
      if (route.children) {
        return {
          key: route.path,
          label: route.name,
          children: renderRoutes(route.children),
        };
      }
      return {
        key: route.path,
        label: route.name,
      };
    })
  }

  return (
    <div>
      <AntdMenu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['/']}
        mode="inline"
        items={renderRoutes(routes[0].children!)}
      />
    </div>
  )
}

export default Menu