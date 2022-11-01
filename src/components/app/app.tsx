import React from 'react';
import { Router } from "components/router";

export const App = () => {
    return (
        <div className="min-h-full">
            <main>
                <Router key='router'/>
            </main>
        </div>
    );
}
