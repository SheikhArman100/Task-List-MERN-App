"use client";
import { format, isAfter, isBefore, isToday } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Controller, useFormContext } from "react-hook-form";

const DatePicker = ({ isModalOpen }) => {
  const { control } = useFormContext();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const defaultMonth = new Date(year, month);

  const [selectedDay, setSelectedDay] = useState("");

  // Determine the button's color class based on the selected day
  const buttonColorClass =
    isAfter(selectedDay, today) || isToday(selectedDay)
      ? "border-green-500 text-green-500"
      : isBefore(selectedDay, today)
      ? "border-red-500 text-red-500"
      : "border-gray-500 text-gray-200";

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedDay("");
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        type="button"
        className={`py-2 px-2 md:px-3 border rounded-lg flex items-center gap-x-1 md:gap-x-2 text-sm text-gray-200 whitespace-nowrap ${buttonColorClass}`}
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        {!selectedDay ? (
          <p>Due Date</p>
        ) : selectedDay.getDate() === today.getDate() ? (
          <p>Today</p>
        ) : (
          <p className="text-xs md:text-sm">{format(selectedDay, "PPP")}</p>
        )}
        <CalendarDays size={20} />
      </button>
      <dialog id="my_modal_2" className="modal">
        <section className="modal-box overflow-hidden max-w-[20rem] flex items-center justify-center bg-customBlack border border-gray-500 text-sm">
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <DayPicker
                mode="single"
                showOutsideDays
                fixedWeeks
                defaultMonth={defaultMonth}
                modifiers={{ today: today }}
                modifiersStyles={{
                  today: isToday(selectedDay)
                    ? { backgroundColor: "hsl(5, 77%, 55%)" }
                    : { backgroundColor: "white", color: "black" },
                  selected: { backgroundColor: "hsl(5, 77%, 55%)" },
                }}
                selected={value}
                onSelect={onChange}
                onDayClick={(date) => {
                  setSelectedDay(date);
                  document.getElementById("my_modal_2").close();
                }}
              />
            )}
          />
        </section>
        <div method="dialog" className="modal-backdrop">
          <button
            type="button"
            onClick={() => document.getElementById("my_modal_2").close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DatePicker;
