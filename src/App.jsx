import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { NotificationProvider } from "./context/NotificationContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import Sidebar from "./components/layout/navigation/Sidebar";
import Footer from "./components/layout/navigation/Footer";
import NotificationContainer from "./components/ui/NotificationContainer";
import { CollectionProvider } from "./context/CollectionContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ImpersonationBanner from "./components/admin/ImpersonationBanner";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ui/ToastContainer";
import RequireRole from "./components/auth/RequireRole";

// ── Core Boot Paths (Fast, Static) ──────────────────────────────────────────────
// Auth states must be static so redirection and login flashes instantly
import LoginPage from "./pages/auth/LoginPage";
import AcceptInvitationPage from "./pages/auth/AcceptInvitationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// ── Heavy Application Chunks (Lazy Loaded) ────────────────────────────────────
const HomePage = React.lazy(() => import("./pages/home/HomePage"));
const ProjectsPage = React.lazy(() => import("./pages/projects/ProjectsPage"));
const ProjectDetailPage = React.lazy(() => import("./pages/projects/ProjectDetailPage"));
const FavoritesPage = React.lazy(() => import("./pages/user/FavoritesPage"));
const ListingsPage = React.lazy(() => import("./pages/listings/ListingsPage"));
const CreateListingPage = React.lazy(() => import("./pages/listings/CreateListingPage"));
const ListingSuccessPage = React.lazy(() => import("./pages/listings/ListingSuccessPage"));
const EditListingPage = React.lazy(() => import("./pages/listings/EditListingPage"));
const ListingDetailPage = React.lazy(() => import("./pages/listings/ListingDetailPage"));
const PremiumBrochureView = React.lazy(() => import("./pages/brochures/PremiumBrochureView"));
const ComprehensiveBrochureView = React.lazy(() => import("./pages/brochures/ComprehensiveBrochureView"));
const ComingSoonPage = React.lazy(() => import("./pages/common/ComingSoonPage"));
const DashboardPage = React.lazy(() => import("./pages/user/DashboardPage"));
const MarketPage = React.lazy(() => import("./pages/user/MarketPage"));
const TicketsPage = React.lazy(() => import("./pages/user/TicketsPage"));
const OpsPage = React.lazy(() => import("./pages/admin/OpsPage"));
const CollectionsPage = React.lazy(() => import("./pages/user/CollectionsPage"));
const DevelopersPage = React.lazy(() => import("./pages/developers/DevelopersPage"));
const DeveloperProjectsPage = React.lazy(() => import("./pages/developers/DeveloperProjectsPage"));
const ApiTestPage = React.lazy(() => import("./pages/common/ApiTestPage"));
const AdminPage = React.lazy(() => import("./pages/admin/AdminPage"));
const CompanyDetailPage = React.lazy(() => import("./pages/admin/CompanyDetailPage"));
const CompanyAdminPage = React.lazy(() => import("./pages/admin/CompanyAdminPage"));


// ─── Boot Loading Screen ───────────────────────────────────────────────────────
// Shown only during the one-time async session verification on app start.
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-[#0a0d18]">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -mr-64 -mt-64 animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -ml-64 -mb-64 animate-pulse" />
    <div className="relative flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-[#ccab59] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#ccab59]/30 animate-pulse">
        <span className="text-white font-serif font-black text-3xl italic">V</span>
      </div>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#ccab59] animate-spin" />
      </div>
      <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold tracking-widest uppercase">
        Authenticating…
      </p>
    </div>
  </div>
);

// ─── App Router ────────────────────────────────────────────────────────────────
const AppRouter = () => {
  const { user, isAuthenticated, initializing } = useAuth();
  const location = useLocation();
  const activeRole = user?.role?.toLowerCase().replace(/\s+/g, '') || 'guest';

  // ── Phase 1: session check in progress ──────────────────────────────────────
  if (initializing) {
    return <LoadingScreen />;
  }

  // ── Phase 2: not authenticated ───────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<AcceptInvitationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="*"
          element={<Navigate to="/login" state={{ from: location }} replace />}
        />
      </Routes>
    );
  }

  // ── Phase 3: authenticated ───────────────────────────────────────────────────
  const isBrochure = location.pathname.includes("-brochure");

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isBrochure ? "bg-white dark:bg-[#0a0d18]" : "bg-[#f3efe6] dark:bg-[#0a0d18]"
      }`}
    >
      {/* God Mode Banner — always on top when impersonating */}
      <ImpersonationBanner />

      {!isBrochure && <Sidebar />}

      <div
        className={
          isBrochure
            ? "flex-1 w-full"
            : "flex-1 w-full pt-4 pb-12 px-2 md:px-4 max-w-[1440px] mx-auto"
        }
      >
        <React.Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Diagnostic & Admin Routes first */}
            <Route path="/diagnostics"            element={<ApiTestPage />} />
            <Route path="/login"    element={<Navigate to="/" replace />} />
            {/* <Route path="/register" element={<Navigate to="/" replace />} /> */}
            <Route path="/register" element={<AcceptInvitationPage />} />

            {/* All protected routes */}
            <Route path="/"                       element={<HomePage />} />
            <Route path="/projects"               element={<ProjectsPage />} />
            <Route path="/projects/:id"           element={<ProjectDetailPage />} />
            {/* Native Listings Flow (Upgraded with PF Engine) */}
            <Route path="/listings"               element={<ListingsPage />} />
            <Route path="/listings/create"        element={<CreateListingPage />} />
            <Route path="/listings/success/:id"   element={<ListingSuccessPage />} />
            <Route path="/listings/edit/:id"      element={<EditListingPage />} />
            <Route path="/listings/:id"           element={<ListingDetailPage />} />
            <Route path="/premium-brochure"       element={<PremiumBrochureView />} />
            <Route path="/comprehensive-brochure" element={<ComprehensiveBrochureView />} />
            <Route path="/favs"                   element={<FavoritesPage />} />
            <Route path="/collections"            element={<CollectionsPage />} />
            <Route path="/dashboard"              element={<DashboardPage />} />
            <Route path="/ops"                    element={<OpsPage />} />
            <Route path="/market"                 element={<MarketPage />} />
            <Route path="/developers"             element={<DevelopersPage />} />
            <Route path="/developers/:id"         element={<DeveloperProjectsPage />} />
            <Route path="/tools"                  element={<ComingSoonPage label="Tools" />} />
            <Route path="/tickets"                element={<TicketsPage />} />

            <Route path="/admin/*" element={
              <RequireRole roles={['superadmin']}>
                <AdminPage />
              </RequireRole>
            } />
            <Route path="/admin/companies/:slug" element={
              <RequireRole roles={['superadmin']}>
                <CompanyDetailPage />
              </RequireRole>
            } />
            <Route path="/my-company/:slug" element={
              <RequireRole roles={['admin', 'superadmin']}>
                <CompanyAdminPage />
              </RequireRole>
            } />

            
            <Route path="/my-company" element={<Navigate to={`/my-company/${user?.company?.slug || user?.company_slug || 'dashboard'}`} replace />} />

            <Route path="/tickets"                element={<ComingSoonPage label="Tickets" />} />
            <Route path="*"                       element={<ComingSoonPage label="Page not found" />} />
          </Routes>
        </React.Suspense>
      </div>

      {!isBrochure && <Footer />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider>
          <ToastProvider>
            <AuthProvider>
              <CollectionProvider>
                <ProjectProvider>
                  <NotificationContainer />
                  <ToastContainer />
                  <AppRouter />
                </ProjectProvider>
              </CollectionProvider>
            </AuthProvider>
          </ToastProvider>
        </NotificationProvider>
      </ThemeProvider>
      {/* {import.meta.env.DEV && (
        <React.Suspense fallback={null}>
          {React.createElement(
            React.lazy(() => import('@tanstack/react-query-devtools').then(m => ({ default: m.ReactQueryDevtools }))),
            { initialIsOpen: false }
          )}
        </React.Suspense>
      )} */}
    </QueryClientProvider>
  );
}

export default App;
