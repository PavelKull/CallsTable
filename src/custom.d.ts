declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.svg' {
    import { FunctionComponent, SVGProps } from 'react';
    const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
    export { ReactComponent };
}
