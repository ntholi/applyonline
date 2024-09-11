/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/_main'
import { Route as AdminImport } from './routes/_admin'

// Create Virtual Routes

const MainIndexLazyImport = createFileRoute('/_main/')()
const MainLoginLazyImport = createFileRoute('/_main/login')()
const MainCoursesLazyImport = createFileRoute('/_main/courses')()
const MainApplyLazyImport = createFileRoute('/_main/apply')()
const MainAccountLazyImport = createFileRoute('/_main/account')()
const AdminAdminIndexLazyImport = createFileRoute('/_admin/admin/')()
const AdminAdminCoursesLazyImport = createFileRoute('/_admin/admin/courses')()
const AdminAdminApplicationsLazyImport = createFileRoute(
  '/_admin/admin/applications',
)()

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/_main',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const MainIndexLazyRoute = MainIndexLazyImport.update({
  path: '/',
  getParentRoute: () => MainRoute,
} as any).lazy(() => import('./routes/_main/index.lazy').then((d) => d.Route))

const MainLoginLazyRoute = MainLoginLazyImport.update({
  path: '/login',
  getParentRoute: () => MainRoute,
} as any).lazy(() => import('./routes/_main/login.lazy').then((d) => d.Route))

const MainCoursesLazyRoute = MainCoursesLazyImport.update({
  path: '/courses',
  getParentRoute: () => MainRoute,
} as any).lazy(() => import('./routes/_main/courses.lazy').then((d) => d.Route))

const MainApplyLazyRoute = MainApplyLazyImport.update({
  path: '/apply',
  getParentRoute: () => MainRoute,
} as any).lazy(() => import('./routes/_main/apply.lazy').then((d) => d.Route))

const MainAccountLazyRoute = MainAccountLazyImport.update({
  path: '/account',
  getParentRoute: () => MainRoute,
} as any).lazy(() => import('./routes/_main/account.lazy').then((d) => d.Route))

const AdminAdminIndexLazyRoute = AdminAdminIndexLazyImport.update({
  path: '/admin/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/index.lazy').then((d) => d.Route),
)

const AdminAdminCoursesLazyRoute = AdminAdminCoursesLazyImport.update({
  path: '/admin/courses',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/courses.lazy').then((d) => d.Route),
)

const AdminAdminApplicationsLazyRoute = AdminAdminApplicationsLazyImport.update(
  {
    path: '/admin/applications',
    getParentRoute: () => AdminRoute,
  } as any,
).lazy(() =>
  import('./routes/_admin/admin/applications.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      id: '/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/_main/account': {
      id: '/_main/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof MainAccountLazyImport
      parentRoute: typeof MainImport
    }
    '/_main/apply': {
      id: '/_main/apply'
      path: '/apply'
      fullPath: '/apply'
      preLoaderRoute: typeof MainApplyLazyImport
      parentRoute: typeof MainImport
    }
    '/_main/courses': {
      id: '/_main/courses'
      path: '/courses'
      fullPath: '/courses'
      preLoaderRoute: typeof MainCoursesLazyImport
      parentRoute: typeof MainImport
    }
    '/_main/login': {
      id: '/_main/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof MainLoginLazyImport
      parentRoute: typeof MainImport
    }
    '/_main/': {
      id: '/_main/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainIndexLazyImport
      parentRoute: typeof MainImport
    }
    '/_admin/admin/applications': {
      id: '/_admin/admin/applications'
      path: '/admin/applications'
      fullPath: '/admin/applications'
      preLoaderRoute: typeof AdminAdminApplicationsLazyImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/courses': {
      id: '/_admin/admin/courses'
      path: '/admin/courses'
      fullPath: '/admin/courses'
      preLoaderRoute: typeof AdminAdminCoursesLazyImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/': {
      id: '/_admin/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAdminIndexLazyImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

interface AdminRouteChildren {
  AdminAdminApplicationsLazyRoute: typeof AdminAdminApplicationsLazyRoute
  AdminAdminCoursesLazyRoute: typeof AdminAdminCoursesLazyRoute
  AdminAdminIndexLazyRoute: typeof AdminAdminIndexLazyRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAdminApplicationsLazyRoute: AdminAdminApplicationsLazyRoute,
  AdminAdminCoursesLazyRoute: AdminAdminCoursesLazyRoute,
  AdminAdminIndexLazyRoute: AdminAdminIndexLazyRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

interface MainRouteChildren {
  MainAccountLazyRoute: typeof MainAccountLazyRoute
  MainApplyLazyRoute: typeof MainApplyLazyRoute
  MainCoursesLazyRoute: typeof MainCoursesLazyRoute
  MainLoginLazyRoute: typeof MainLoginLazyRoute
  MainIndexLazyRoute: typeof MainIndexLazyRoute
}

const MainRouteChildren: MainRouteChildren = {
  MainAccountLazyRoute: MainAccountLazyRoute,
  MainApplyLazyRoute: MainApplyLazyRoute,
  MainCoursesLazyRoute: MainCoursesLazyRoute,
  MainLoginLazyRoute: MainLoginLazyRoute,
  MainIndexLazyRoute: MainIndexLazyRoute,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof MainRouteWithChildren
  '/account': typeof MainAccountLazyRoute
  '/apply': typeof MainApplyLazyRoute
  '/courses': typeof MainCoursesLazyRoute
  '/login': typeof MainLoginLazyRoute
  '/': typeof MainIndexLazyRoute
  '/admin/applications': typeof AdminAdminApplicationsLazyRoute
  '/admin/courses': typeof AdminAdminCoursesLazyRoute
  '/admin': typeof AdminAdminIndexLazyRoute
}

export interface FileRoutesByTo {
  '': typeof AdminRouteWithChildren
  '/account': typeof MainAccountLazyRoute
  '/apply': typeof MainApplyLazyRoute
  '/courses': typeof MainCoursesLazyRoute
  '/login': typeof MainLoginLazyRoute
  '/': typeof MainIndexLazyRoute
  '/admin/applications': typeof AdminAdminApplicationsLazyRoute
  '/admin/courses': typeof AdminAdminCoursesLazyRoute
  '/admin': typeof AdminAdminIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_admin': typeof AdminRouteWithChildren
  '/_main': typeof MainRouteWithChildren
  '/_main/account': typeof MainAccountLazyRoute
  '/_main/apply': typeof MainApplyLazyRoute
  '/_main/courses': typeof MainCoursesLazyRoute
  '/_main/login': typeof MainLoginLazyRoute
  '/_main/': typeof MainIndexLazyRoute
  '/_admin/admin/applications': typeof AdminAdminApplicationsLazyRoute
  '/_admin/admin/courses': typeof AdminAdminCoursesLazyRoute
  '/_admin/admin/': typeof AdminAdminIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/account'
    | '/apply'
    | '/courses'
    | '/login'
    | '/'
    | '/admin/applications'
    | '/admin/courses'
    | '/admin'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/account'
    | '/apply'
    | '/courses'
    | '/login'
    | '/'
    | '/admin/applications'
    | '/admin/courses'
    | '/admin'
  id:
    | '__root__'
    | '/_admin'
    | '/_main'
    | '/_main/account'
    | '/_main/apply'
    | '/_main/courses'
    | '/_main/login'
    | '/_main/'
    | '/_admin/admin/applications'
    | '/_admin/admin/courses'
    | '/_admin/admin/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AdminRoute: typeof AdminRouteWithChildren
  MainRoute: typeof MainRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AdminRoute: AdminRouteWithChildren,
  MainRoute: MainRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_admin",
        "/_main"
      ]
    },
    "/_admin": {
      "filePath": "_admin.tsx",
      "children": [
        "/_admin/admin/applications",
        "/_admin/admin/courses",
        "/_admin/admin/"
      ]
    },
    "/_main": {
      "filePath": "_main.tsx",
      "children": [
        "/_main/account",
        "/_main/apply",
        "/_main/courses",
        "/_main/login",
        "/_main/"
      ]
    },
    "/_main/account": {
      "filePath": "_main/account.lazy.tsx",
      "parent": "/_main"
    },
    "/_main/apply": {
      "filePath": "_main/apply.lazy.tsx",
      "parent": "/_main"
    },
    "/_main/courses": {
      "filePath": "_main/courses.lazy.tsx",
      "parent": "/_main"
    },
    "/_main/login": {
      "filePath": "_main/login.lazy.tsx",
      "parent": "/_main"
    },
    "/_main/": {
      "filePath": "_main/index.lazy.tsx",
      "parent": "/_main"
    },
    "/_admin/admin/applications": {
      "filePath": "_admin/admin/applications.lazy.tsx",
      "parent": "/_admin"
    },
    "/_admin/admin/courses": {
      "filePath": "_admin/admin/courses.lazy.tsx",
      "parent": "/_admin"
    },
    "/_admin/admin/": {
      "filePath": "_admin/admin/index.lazy.tsx",
      "parent": "/_admin"
    }
  }
}
ROUTE_MANIFEST_END */
