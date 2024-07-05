import Header from "../common/Header";
import React, { useEffect } from 'react';
import OnewordListFormComponent from "@/components/oneword/OnewordListFormComponent";

function Index() {

    return (
        <div>
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="w-[1536px]">
                    <OnewordListFormComponent />
                </div>
            </div>
        </div>
    )
}

export default Index;