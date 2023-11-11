import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

interface BaseLayoutProps {
  children?: ReactNode;
}

// const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
const BaseLayout: FC<BaseLayoutProps> = () => {
  // return <>{children || <Outlet />}</>;
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        minWidth: '100vw',
        minHeight: '100vh',
        // backgroundColor: 'blue',
      }}
    >
      <Outlet />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
