export function classNames(...classNames: (string | boolean)[]) {
    return classNames.filter(Boolean).join(' ');
}
