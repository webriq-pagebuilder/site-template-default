import React from "react";
import { Button, Text } from "components/ui";
import { MdKeyboardArrowDown } from "react-icons/md";

export function SelectSettings({ label, value, options, handleChangeFn, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Text fontSize="sm">
          {label}
        </Text>
      )}
      <div className="relative">
        <div className="flex items-center">
          <select
            aria-label={placeholder}
            value={value}
            className="w-full appearance-none h-10 rounded border border-gray-300 text-sm focus:outline-none px-2"
            onChange={handleChangeFn}
          >
            <option value="">{placeholder}</option>
            {options &&
              Object.entries(options)?.filter(([key]) => key !== "global")?.map(
                ([key, value]) => (
                  <option
                    value={value as string | number | readonly string[]}
                    key={key}
                  >
                    {value}
                  </option>
                )
              )}
          </select>
          <Button
            as="button"
            ariaLabel="Show fonts"
            variant="unstyled"
            className="absolute top-0 right-0 p-3 bg-transparent text-black pointer-events-none"
          >
            <MdKeyboardArrowDown className="w-5 h-5"/>
          </Button>
        </div>
      </div>
    </div>
  )
}