import React from 'react';

import 'Styles/Loading.scss';

const Loading = (): React.ReactElement => {
    return (
        <div className='loading-background'>
            <div className='loading-dual-ring'></div>
        </div>
    );
};

export default Loading;