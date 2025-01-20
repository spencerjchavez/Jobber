import React from "react"

interface MainContainerProps {
    sidebarLeft: React.ReactNode;
    mainContent: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({sidebarLeft, mainContent }) => {
    return <div className="row">
        <div className="col-12 col-lg-3 p-3 p-lg-5"> 
            {sidebarLeft}
        </div>
        <div className="col-12 col-lg-9 p-3 p-lg-5"> 
            {mainContent}
        </div>
    </div>
}

export default MainContainer;