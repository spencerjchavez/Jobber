import React from "react"

interface MainContainerProps {
    sidebarLeft: React.ReactNode;
    mainContent: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({sidebarLeft, mainContent }) => {
    return <div className="row">
        <div className="col-lg-3 col-12 sticky-lg p-5">
            {sidebarLeft}
        </div>
        <div className="col-lg-9 col-12 p-5">
            {mainContent}
        </div>
    </div>
}

export default MainContainer;