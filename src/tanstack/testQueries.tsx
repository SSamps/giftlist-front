const someData = [{id: 1, name: "a"}, {id: 2, name: "b"}]

export const wait = (duration: number) => new Promise((resolve) => {
    console.log(`waiting for '${duration}'`);
    return setTimeout(resolve, duration)});

export const testQuery = async () => {
    return wait(5000).then(() => [...someData])
};

    