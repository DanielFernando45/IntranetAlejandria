import React, { useState, useEffect } from 'react';
import LayoutApp from '../../layout/LayoutApp';
import Zoom from "../../assets/images/zoom.svg";

const CalendarioAsesor = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthName, setMonthName] = useState('');
  const [dayName, setDayName] = useState('');

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  useEffect(() => {
    generateCalendar();
  }, [selectedMonth, selectedYear]);

  const generateCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const prevMonthDays = new Date(selectedYear, selectedMonth, 0).getDate();

    let days = [];

    // Días del mes anterior
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        date: new Date(selectedYear, selectedMonth - 1, prevMonthDays - i)
      });
    }

    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      days.push({
        day: i,
        currentMonth: true,
        date: date,
        isToday: i === new Date().getDate() &&
          selectedMonth === new Date().getMonth() &&
          selectedYear === new Date().getFullYear()
      });
    }

    // Días del siguiente mes
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(selectedYear, selectedMonth + 1, i)
      });
    }

    setCalendarDays(days);
    setMonthName(months[selectedMonth]);
    updateSelectedDayInfo(selectedDay);
  };

  const updateSelectedDayInfo = (day) => {
    const date = new Date(selectedYear, selectedMonth, day);
    const options = { weekday: 'long' };
    const dayName = new Intl.DateTimeFormat('es-ES', options).format(date);
    setDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  };

  const handleDayClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDay(day);
      updateSelectedDayInfo(day);
    }
  };

  const renderCalendarDays = () => {
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex gap-2">
        {week.map((dayData, dayIndex) => {
          const isSelected = dayData.currentMonth && dayData.day === selectedDay;
          const isToday = dayData.isToday;

          return (
            <div
              key={dayIndex}
              onClick={() => handleDayClick(dayData.day, dayData.currentMonth)}
              className={`
                flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] 
                cursor-pointer transition-colors duration-200
                ${dayData.currentMonth ?
                  isSelected ? 'bg-[#4BD7F5] text-white' :
                    isToday ? 'border-2 border-[#4BD7F5] text-[#4BD7F5]' :
                      'text-[#575051] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]' :
                  'text-[#D2CECF] hover:bg-[#E9E7E7]'}
              `}
            >
              {dayData.day}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <LayoutApp>
      <main className='m-5 flex gap-[60px]'>
        <div className='flex flex-col w-[60%] justify-center items-center'>
          <div className='flex w-full justify-between mb-10 items-center'>
            <p className='font-semibold text-[20px] text-[#575051]'>Calendario de actividades</p>
            <div className='flex gap-3'>
              <select
                className='bg-[#1C1C34] p-[5px] rounded-lg text-white w-[120px] h-[35px] font-semibold'
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>

              <select
                className='bg-[#1C1C34] p-[5px] rounded-lg text-white w-[100px] h-[35px] font-semibold'
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {Array.from({ length: 6 }, (_, i) => 2030 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select className='border border-[#1C1C34] rounded-lg w-[240px] h-[35px] font-semibold text-[#575051]'>
                <option value="">Seleccione alumno(s)</option>
                <option value="">Dana Ortiz</option>
                <option value="">Alex Alberto</option>
                <option value="">Rodolfo Alfred</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className='flex justify-center items-center rounded-full w-[85px] h-[35px] text-[18px] font-semibold text-[#575051]'
                >
                  {day}
                </div>
              ))}
            </div>

            {renderCalendarDays()}
          </div>
        </div>

        <div className='flex flex-col h-full justify-center p-5 gap-8 w-[40%] bg-white rounded-xl shadow-md'>
          <div className='text-center'>
            <p className='text-[#b1afb0] font-medium text-[20px]'>{dayName}</p>
            <h2 className='text-[50px] font-semibold text-[#575051]'>{selectedDay}</h2>
            <h1 className='text-[#575051] text-[25px] font-semibold'>{monthName}</h1>
          </div>

          <div className='flex flex-col gap-4 overflow-y-auto max-h-[500px]'>
            <div className='bg-white flex w-full min-h-[121px] gap-2 p-4 border-2 border-[#E9E7E7] rounded-lg'>
              <div className='flex items-start pt-1'>
                <div className='w-[15px] h-[15px] rounded-full bg-[#4E4E91]'></div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'>10:00am - 12:00am</p>
                <h2 className='text-[25px] font-bold text-[#575051]'>John Mobbin</h2>
                <div className='flex gap-2 items-center'>
                  <img src={Zoom} alt="Zoom" className='w-4 h-4' />
                  <p className='text-[#82777A]'>Avance de IV Capitulo</p>
                </div>
              </div>
            </div>

            <div className='bg-white flex w-full min-h-[121px] gap-2 p-4 border-2 border-[#E9E7E7] rounded-lg'>
              <div className='flex items-start pt-1'>
                <div className='w-[15px] h-[15px] rounded-full bg-[#4E4E91]'></div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'>12:00am</p>
                <h2 className='text-[25px] font-bold text-[#575051]'>Entrega de avance</h2>
                <p className='text-[#82777A]'>Fecha limite: 28 de {monthName}</p>
              </div>
            </div>

            <div className='bg-white flex w-full min-h-[121px] gap-2 p-4 border-2 border-[#E9E7E7] rounded-lg'>
              <div className='flex items-start pt-1'>
                <div className='w-[15px] h-[15px] rounded-full bg-[#4E4E91]'></div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'>12:00am</p>
                <h2 className='text-[25px] font-bold text-[#575051]'>Entrega de avance</h2>
                <p className='text-[#82777A]'>Fecha limite: 28 de {monthName}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutApp>
  );
};

export default CalendarioAsesor;