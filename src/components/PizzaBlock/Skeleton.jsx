import ContentLoader from "react-content-loader";
import React from 'react';

const Skeleton = (props) => {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={500}
            viewBox="0 0 280 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <circle cx="134" cy="136" r="125" />
            <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
            <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
            <rect x="0" y="436" rx="10" ry="10" width="110" height="30" />
            <rect x="170" y="436" rx="10" ry="10" width="110" height="30" />
        </ContentLoader>
    );
};

export default Skeleton;