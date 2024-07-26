import React, {useState} from "react";

export const FlyoutComponent: React.FC = () => {
    const [isFlyOut, setFlyOut] = useState();

    const clickHandler = () => {
        console.log('download started')
    }

    const disabledHandler = () => {
        return isFlyOut ? 1 : 0;
    }

    return (
        <div className={'flyout-container'}>
            <button onClick={clickHandler} disabled={!isFlyOut}>Download</button>
        </div>
    )
}