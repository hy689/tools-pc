import { Outlet } from "react-router-dom"
import Menu from "./Menu"
import "./index.css"

const BasicLayout = () => {
  return (
    <div className="basic-layout">
      {/* 顶部导航栏 */}
      <header className="basic-layout-header"></header>
      <main className="basic-layout-main">
        {/* 侧边栏 */}
        <aside className="basic-layout-aside">
          <Menu></Menu>
        </aside>
        {/* 主要内容 */}
        <article className="basic-layout-article">
          <Outlet></Outlet>
        </article>
      </main>
      <footer className="basic-layout-footer"></footer>
    </div>
  )
}

export default BasicLayout