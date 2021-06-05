/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> { }

declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}
