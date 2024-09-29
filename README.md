## 目录解构
此处使用大驼峰命名组件（component）和页面（page），其他文件通常用小驼峰

如果你有路由，那么此时component中的组件应为通用组件。

src/
├── components/
│   ├── MyHeader.tsx
│   └── MyFooter.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── Widget/
│       ├── components/
│       │   ├── Tool.tsx
│       │   └── Option.tsx
│       ├── helpers/
│       │   └── setOptionStorage.ts
│       ├── Widget.tsx
│       └── index.ts
├── hooks/
│   └── useTheme.ts
├── utils/
│   └── getRamdomNumber.ts
└── constants.ts
