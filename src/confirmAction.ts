export function confirmAction(action: () => void): () => void {
    return () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to clear all users?')) {
            action();
        }
    };
}
