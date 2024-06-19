import Header from "../common/Header";
import React, { useEffect } from 'react';
import OnewordListFormComponent from "@/components/oneword/OnewordListFormComponent";

function Index() {

    return (
        <div>
            <div className="sticky top-0">
                <Header />
            </div>
            <div className="flex justify-center">
                <div className="border-solid border flex justify-between  w-[1536px]">
                    <OnewordListFormComponent />
                </div>
            </div>
        </div>
    )
}

export default Index;