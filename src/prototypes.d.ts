declare global {
    interface Promise<T> {
        loading: (loaderId: string) => Promise<T>
    }
}