import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TimeManagement() {
  const [delayMinutes, setDelayMinutes] = useState("");
  const [savedDelay, setSavedDelay] = useState(0);

  const baseMin = 15;
  const baseMax = 20;
  const totalMin = baseMin + savedDelay;
  const totalMax = baseMax + savedDelay;

  function handleSave() {
    const delay = Number.parseInt(delayMinutes) || 0;
    if (delay < 0) {
      toast.error("Delay cannot be negative");
      return;
    }
    setSavedDelay(delay);
    toast.success(
      `Delay updated! New prep time: ${baseMin + delay}–${baseMax + delay} minutes`,
    );
    setDelayMinutes("");
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Time Management</h1>
        <p className="text-sm text-gray-500">
          Set preparation times and delay notices for students.
        </p>
      </div>

      {/* Current Time Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Clock size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Default Preparation Time
            </p>
            <p className="text-sm text-gray-500">
              Base estimate for all orders
            </p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-orange-500">
            {baseMin}–{baseMax}
          </span>
          <span className="text-lg text-gray-500">minutes</span>
        </div>
      </div>

      {/* Delay Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6">
        <h2 className="font-semibold text-gray-900 mb-1">Add Delay Time</h2>
        <p className="text-sm text-gray-500 mb-4">
          Notify students of additional wait time (e.g. rush hour, ingredient
          shortage).
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="delay">Additional Delay (minutes)</Label>
            <div className="flex gap-2">
              <Input
                id="delay"
                type="number"
                min="0"
                placeholder="e.g. 10"
                value={delayMinutes}
                onChange={(e) => setDelayMinutes(e.target.value)}
                className="max-w-[160px]"
                data-ocid="time.delay.input"
              />
              <Button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                data-ocid="time.save_button"
              >
                Save Delay
              </Button>
              {savedDelay > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSavedDelay(0);
                    toast.success("Delay removed");
                  }}
                  data-ocid="time.reset.button"
                >
                  Remove Delay
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Current Estimated Wait */}
      <div
        className={`rounded-xl border shadow-xs p-5 flex items-center gap-4 ${
          savedDelay > 0
            ? "bg-amber-50 border-amber-200"
            : "bg-white border-gray-100"
        }`}
        data-ocid="time.section"
      >
        <AlertCircle
          size={20}
          className={savedDelay > 0 ? "text-amber-500" : "text-gray-400"}
        />
        <div>
          <p className="font-semibold text-gray-900">
            Current Estimated Wait:{" "}
            <span className="text-orange-500">
              {totalMin}–{totalMax} minutes
            </span>
          </p>
          {savedDelay > 0 ? (
            <p className="text-sm text-amber-600">
              ⚠️ +{savedDelay} min delay is active. Students will be notified.
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              No delay currently active. Default prep time applies.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
