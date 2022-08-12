export const getLocal = (name) => {
    return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
    localStorage.setItem(name, value)
}

export function prefix(url){
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = process.env.NODE_ENV === 'development'? `http://localhost:8899/he_ma${url}`
            : `http://www.hema.sale:8899/he_ma${url}`
        return url
    }
}

export function getCarouselUrl(url){
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = process.env.NODE_ENV === 'development'? `http://localhost:8899/${url}`
            : `http://www.hema.sale:8899/${url}`
        return url
    }
}