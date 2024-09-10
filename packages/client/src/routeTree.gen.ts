/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const CoursesLazyImport = createFileRoute('/courses')()
const ApplyLazyImport = createFileRoute('/apply')()
const AccountLazyImport = createFileRoute('/account')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const CoursesLazyRoute = CoursesLazyImport.update({
  path: '/courses',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/courses.lazy').then((d) => d.Route))

const ApplyLazyRoute = ApplyLazyImport.update({
  path: '/apply',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/apply.lazy').then((d) => d.Route))

const AccountLazyRoute = AccountLazyImport.update({
  path: '/account',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/account.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountLazyImport
      parentRoute: typeof rootRoute
    }
    '/apply': {
      id: '/apply'
      path: '/apply'
      fullPath: '/apply'
      preLoaderRoute: typeof ApplyLazyImport
      parentRoute: typeof rootRoute
    }
    '/courses': {
      id: '/courses'
      path: '/courses'
      fullPath: '/courses'
      preLoaderRoute: typeof CoursesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/apply': typeof ApplyLazyRoute
  '/courses': typeof CoursesLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/apply': typeof ApplyLazyRoute
  '/courses': typeof CoursesLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/apply': typeof ApplyLazyRoute
  '/courses': typeof CoursesLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/account' | '/apply' | '/courses'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/account' | '/apply' | '/courses'
  id: '__root__' | '/' | '/account' | '/apply' | '/courses'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AccountLazyRoute: typeof AccountLazyRoute
  ApplyLazyRoute: typeof ApplyLazyRoute
  CoursesLazyRoute: typeof CoursesLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AccountLazyRoute: AccountLazyRoute,
  ApplyLazyRoute: ApplyLazyRoute,
  CoursesLazyRoute: CoursesLazyRoute,
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
        "/",
        "/account",
        "/apply",
        "/courses"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/account": {
      "filePath": "account.lazy.tsx"
    },
    "/apply": {
      "filePath": "apply.lazy.tsx"
    },
    "/courses": {
      "filePath": "courses.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */