import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Root from "./components/root/Root";
import HomePage from "./pages/homePage/HomePage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

import { subredditList } from "./utils/utils";

export function AppRoot() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<HomePage />} />
                {subredditList.map((subreddit) => (
                    <Route
                        key={subreddit}
                        path={subreddit}
                        element={<HomePage />}
                    />
                ))}
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppRoot />
        </BrowserRouter>
    );
}

export default App;
