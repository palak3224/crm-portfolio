import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "@/pages/Services/Services";
import Portfolio from "@/pages/Portfolio/Portfolio";
import Contact from "@/pages/Contact/Contact";
import PricingSection from "@/pages/Pricing/PricingSection";
import Emailautomation from "@/pages/Emailautomation/Email";
import BookAppointment from "@/pages/BookAppointment/BookAppointment";
import Chatbot from "@/pages/Chatbot/Chatbot";
import Helpdesk from "@/pages/HelpDesk/Helpdesk";
import CrmSales from "@/pages/CrmSales/CrmSales";
import TermsConditionsPage from "@/pages/TermsConditions/TermsConditionsPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy/PrivacyPolicyPage";
import Ecommerce from "@/pages/Ecommerce/Ecommerce";

// Dashboard imports
import DashboardApp from "@/dashboard/DashboardApp";
import Dashboard from "@/dashboard/Dashboard";
import Overview from "@/dashboard/Overview";
import ContactForms from "@/dashboard/ContactForms";
import Analytics from "@/dashboard/Analytics";
import Users from "@/dashboard/Users";
import Reports from "@/dashboard/Reports";
import Settings from "@/dashboard/Settings";
import Login from "@/dashboard/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "portfolio",
        element: <Portfolio />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "pricing",
        element: <PricingSection />
      } ,
      {
        path: "email-automation",
        element: <Emailautomation />
      },
      {
        path: "book-appointment",
        element: <BookAppointment />
      },
      {
        path: "chat-bot",
        element: <Chatbot />

      },
      {
        path: "help-desk",
        element: <Helpdesk />
      },
        {
        path: "crm-sales",
        element: <CrmSales />
      },
      {
        path: "terms-conditions",
        element: <TermsConditionsPage />
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "ecommerce",
        element: <Ecommerce />
      },
      {
        path: "admin-login",
        element: <Login />
      }
    ],
  },
  // Dashboard routes
  {
    path: "/dashboard",
    element: <DashboardApp />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Overview />,
          },
          {
            path: "contacts",
            element: <ContactForms />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "settings",
            element: <Settings />,
          }
        ],
      }
    ],
  }
]);
