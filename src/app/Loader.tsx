import { FC, Suspense } from "react"
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className={'loading-center-lg'}>
            <Spin />
        </div>
    )
}

const Loader = (Component: FC) => (props: any) =>
    <Suspense fallback={<Loading />}>
        <Component {...props} />
    </Suspense>

export default Loader