declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
// 设置jsx的语法  所有的都为any  使编辑器不爆红