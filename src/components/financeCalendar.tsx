import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/pt-br"
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



export const FinanceCalendar = () => {

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
    dayjs.locale("pt-br")

    const handleSelectedDate = (date: any) => {

        if (date.$d) {
            const getDate = new Date(date)
            const selDay = getDate.getDate()
            const month = getDate.getMonth() + 1
            const year = getDate.getFullYear()
            console.log(`Data escolhida: ${selDay > 9 ? selDay : "0" + selDay}, ${month > 9 ? month : "0" + month}, ${year}`)
            setSelectedDate(date)
        }
    }

    return (
        <div className="lg:max-w-80 h-fit text-center bg-white rounded-md shadow shadow-gray-400">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DateCalendar
                    referenceDate={dayjs('2022-04-17')}
                    views={['year', 'month', 'day']}
                    value={selectedDate} // data atual selecionada
                    onChange={(newDate) => handleSelectedDate(newDate)}
                />
            </LocalizationProvider>
        </div>
    )
}