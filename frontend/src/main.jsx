import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginComponent from './components/LoginComponent.jsx'
import ListComponent from "./components/ListComponent.jsx"
import { Toaster } from 'react-hot-toast'
import SignupComponent from './components/SignupComponent.jsx'
import EditComponent from "./components/EditComponent.jsx"
import ErrorComponent from './errors/ErrorComponent.jsx'
import ErrorBoundary from './errors/ErrorBoundary.jsx'
import AddRemoveComponent from './components/AddRemoveComponent.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginComponent />,
    errorElement: <ErrorComponent />
  },
  {
    path: "/signup",
    element: <SignupComponent />
  },
  {
    path: "/auth/pokeball",
    element: <ListComponent />
  },
  {
    path: "/auth/edit",
    element: <EditComponent />
  }
  , {
    path: "/auth/addremove",
    element: <AddRemoveComponent />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
    <Toaster />
  </StrictMode>,
)
