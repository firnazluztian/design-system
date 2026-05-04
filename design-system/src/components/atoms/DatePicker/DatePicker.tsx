import React, { useState, forwardRef } from "react";
import {
  PrimitiveDatePicker,
  PrimitiveDatePickerProps,
} from "./PrimitiveDatePicker";

export type DatePickerMode = "single" | "range";

export interface DatePickerProps
  extends Omit<PrimitiveDatePickerProps, "onChange" | "value"> {
  mode?: DatePickerMode;
  value?: Date | [Date, Date];
  onChange?: (date: Date | [Date | undefined, Date | undefined]) => void;
  monthsToShow?: 1 | 2;
  calendarFooter?: React.ReactNode;
  /** Whether the date picker is in an error state */
  error?: boolean;
  /** Error message to display below the input */
  errorText?: string;
  /** Date format for input display and parsing */
  format?: "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY";
  /** Whether to allow manual input typing */
  allowInput?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      monthsToShow = 1,
      calendarFooter,
      error = false,
      errorText,
      format = "DD-MM-YYYY",
      allowInput = false,
      ...props
    },
    ref
  ) => {
    // State for range selection
    const [range, setRange] = useState<[Date | undefined, Date | undefined]>([
      undefined,
      undefined,
    ]);

    // Single mode
    if (mode === "single") {
      const singleValue = Array.isArray(value) ? value[0] : value;
      return (
        <PrimitiveDatePicker
          ref={ref}
          value={singleValue === null ? undefined : singleValue}
          onChange={(date) => onChange?.(date)}
          monthsToShow={monthsToShow}
          calendarFooter={calendarFooter}
          error={error}
          errorText={errorText}
          format={format}
          allowInput={allowInput}
          {...props}
        />
      );
    }

    // Range mode (check-in/check-out in one input)
    if (mode === "range") {
      let [start, end] = Array.isArray(value) ? value : range;
      const handleRangeChange = (date: Date) => {
        if (!start || (start && end)) {
          setRange([date, undefined]);
          onChange?.([date, undefined]);
        } else if (start && !end) {
          if (date < start) {
            setRange([date, start]);
            onChange?.([date, start]);
          } else {
            setRange([start, date]);
            onChange?.([start, date]);
          }
        }
      };
      const formatRange = () => {
        if (!start) return "";
        const format = (d: Date) =>
          d
            ? d.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "";
        if (start && end) {
          return `${format(start)} - ${format(end)}`;
        }
        return format(start);
      };
      return (
        <PrimitiveDatePicker
          ref={ref}
          value={start}
          onChange={handleRangeChange}
          monthsToShow={monthsToShow}
          placeholder={props.placeholder || "Select date range"}
          valueFormatter={formatRange}
          rangeStart={start}
          rangeEnd={end}
          closeOnSelect={Boolean(end)}
          calendarFooter={calendarFooter}
          error={error}
          errorText={errorText}
          format={format}
          allowInput={allowInput}
          {...props}
        />
      );
    }

    return null;
  }
);

DatePicker.displayName = "DatePicker";
