export const dateTime = () => {

    const getDate = new Date()
    const day = getDate.getDate()
    const month = getDate.getMonth() + 1
    const year = getDate.getFullYear()

    return {day, month, year}
}