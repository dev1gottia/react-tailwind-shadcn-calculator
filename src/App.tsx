import { Card, CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@/theme-provider";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("0");

  const buttons: string[] = [
    "C",
    "+-",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
  ];

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("0");
    } else if (value === "+-") {
      setInput((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
    } else if (value === "%") {
      setInput((prev) => String(parseFloat(prev) / 100));
    } else if (value === "=") {
      try {
        const expression = input.replace(/×/g, "*").replace(/÷/g, "/");
        const result = evaluate(expression); // safe evaluation
        setInput(String(result));
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) =>
        prev === "0" && value !== "." ? value : prev + value
      );
    }
  };

  const formatDisplay = (value: string) => {
    // If it's a valid number, format with commas
    if (!isNaN(Number(value))) {
      return Number(value).toLocaleString("en-US");
    }
    return value; // otherwise, show it as-is
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen w-full flex justify-center items-center">
        <Card className="w-96 max-md:mx-4">
          <CardContent>
            <div className="bg-neutral-800 p-4 rounded-md text-right h-24 flex items-center justify-end">
              <span
                className="font-bold block truncate overflow-hidden text-nowrap"
                style={{
                  fontSize: `${Math.max(24, 70 - input.length * 3)}px`,
                }}
              >
                {formatDisplay(input)}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-5">
              {buttons.map((button, i) => (
                <Button
                  key={i}
                  className="w-full h-full aspect-square text-3xl"
                  variant="secondary"
                  onClick={() => handleClick(button)}
                >
                  {button}
                </Button>
              ))}

              <Button
                className="w-full h-full text-3xl col-span-2"
                onClick={() => handleClick("=")}
              >
                =
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
