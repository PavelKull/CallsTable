import React from 'react';
import s from './MainLayout.module.scss';
import classNames from 'classnames';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const MainLayout = ({ children, className, style }: MainLayoutProps) => {
    return (
        <div className={classNames(s.wrapper, className)} style={style}>
            {children}
        </div>
    );
};
export default MainLayout;
