import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import "./assets/styles/Common.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ItemPage } from "./pages/itemPage/itemPage";
import { exchangeLoader } from "./pages/itemPage/itemPage";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/Register";
import { AccountLoader } from "./pages/PersonalAccount/PersonalAccount";
import { AllEchangers } from "./pages/AllExchangersPage/AllEchangers";
import { exchangersLoader } from "./pages/AllExchangersPage/AllEchangers";
import { Articles } from "./pages/Articles/Article";
import { ForPartners } from "./pages/forPartners/forPartners";
import { Articlepage } from "./pages/ArticlePage/ArticlePage";
import { ScammersBase } from "./pages/ScammersBase/ScammersBase";
import { InfoPage } from "./pages/InfoPage/InfoPage";
import { ExchangerReviews } from "./pages/ExchangerReviews/ExchangerReviews";
import { ExchangerCourses } from "./pages/ExchangerCourses/ExchangerCourses";
import { ExchangerMarks } from "./pages/Marks/Marks";
import { ExchangerNotifications } from "./pages/ExchangerNotifications/ExchangerNotifications";
import { HelpingPage } from "./pages/HelpingPage/HelpingPage";
import { ArticleLoader } from "./pages/Articles/Article";
import { infoloader } from "./pages/InfoPage/InfoPage";
import { reviewloader } from "./pages/ExchangerReviews/ExchangerReviews";
import { AccountReviews } from "./pages/AccountReviews/AccountReviews";
import { AccountReviewloader } from "./pages/AccountReviews/AccountReviews";
import { CoursesLoader } from "./pages/ExchangerCourses/ExchangerCourses";
import { ExchangerRegisterPage } from "./pages/ExchangerRegister/ExchangerRegister";
import MainLayout from "./Layouts/MainLayout";
import { TimerPage } from "./pages/TimerPage";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import { FavoriteExchangers } from "./pages/FavoriteExchangers/FavoriteExchangers";
import { FavoriteExchangersLoader } from "./pages/FavoriteExchangers/FavoriteExchangers";
import SubscribeDetail from "./pages/SubscribeDetail/SubscribeDetail";
const router = createBrowserRouter([
  {
    element: <TimerPage />,
    path: "/",
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/changePro",
        element: <MainPage />,
      },
      {
        path: "/ExchangerPage/:id",
        element: <ItemPage />,
        loader: exchangeLoader,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account",
        element: <PersonalAccount />,
        loader: AccountLoader,
      },
      {
        path: "/exchangers",
        element: <AllEchangers />,
        loader: exchangersLoader,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/help",
        element: <HelpingPage />,
      },
      {
        path: "/forPartners",
        element: <ForPartners />,
      },
      {
        path: "/article/:id",
        element: <Articlepage />,
        loader: ArticleLoader,
      },
      {
        path: "/scammersBase",
        element: <ScammersBase />,
      },
      {
        path: "/InfoPage",
        element: <InfoPage />,
        loader: infoloader,
      },
      {
        path: "/ExchangerReviews",
        element: <ExchangerReviews />,
        loader: reviewloader,
      },
      {
        path: "/ExchangerCourses",
        element: <ExchangerCourses />,
        loader: CoursesLoader,
      },
      {
        path: "/ExchangerMarks",
        element: <ExchangerMarks />,
      },
      {
        path: "/ExchangerNotifications",
        element: <ExchangerNotifications />,
      },
      {
        path: "/accountReviews",
        element: <AccountReviews />,
        loader: AccountReviewloader,
      },
      {
        path: "/exchangerregister",
        element: <ExchangerRegisterPage />,
      },
      {
        path: "/account/accountSettings",
        element: <AccountSettings />,
        loader: AccountLoader,
      },
      {
        path: "/account/favoriteexchangers",
        element: <FavoriteExchangers />,
        loader: FavoriteExchangersLoader,
      },
      {
        path:'/account/subscribe/detail',
        element:<SubscribeDetail/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
