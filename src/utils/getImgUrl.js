function getImgUrl (name) {
    return new URL(`../assets/trees/${name}`, import.meta.url)
}

export {getImgUrl}