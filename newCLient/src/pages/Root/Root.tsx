import {FC} from 'react';
import {Navigate} from 'react-router-dom';
import {UPLOAD_DATA} from "../../pathes";

const Root: FC = () => {
    return <Navigate to={UPLOAD_DATA} replace/>;
};

export {Root};
