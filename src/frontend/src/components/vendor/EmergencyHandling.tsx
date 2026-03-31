import { Button } from "@/components/ui/button";
import type { EmergencyRequest } from "@/data/mockVendorData";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  requests: EmergencyRequest[];
  setRequests: React.Dispatch<React.SetStateAction<EmergencyRequest[]>>;
}

function RequestStatusPill({ status }: { status: EmergencyRequest["status"] }) {
  const cfg = {
    pending: "bg-amber-100 text-amber-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cfg[status]}`}
    >
      {status}
    </span>
  );
}

export default function EmergencyHandling({ requests, setRequests }: Props) {
  function updateStatus(id: string, status: "accepted" | "rejected") {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    toast.success(`Request ${status}`);
  }

  const pending = requests.filter((r) => r.status === "pending");
  const resolved = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Emergency Handling</h1>
        <p className="text-sm text-gray-500">
          Review and respond to student time change or cancellation requests.
        </p>
      </div>

      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-700 font-medium">
            {pending.length} request(s) awaiting your response.
          </p>
        </div>
      )}

      {/* Pending */}
      <div className="space-y-3">
        {pending.map((req, i) => (
          <div
            key={req.id}
            className="bg-white rounded-xl border border-orange-200 shadow-xs p-4"
            data-ocid={`emergency.item.${i + 1}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    req.type === "cancel" ? "bg-red-50" : "bg-amber-50"
                  }`}
                >
                  {req.type === "cancel" ? (
                    <XCircle size={18} className="text-red-500" />
                  ) : (
                    <Clock size={18} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">
                      {req.studentName}
                    </span>
                    <span className="text-xs font-bold text-orange-500">
                      #{req.orderId}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        req.type === "cancel"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.type === "cancel" ? "Cancel Order" : "Time Change"}
                    </span>
                  </div>
                  {req.requestedTime && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      New requested time: <strong>{req.requestedTime}</strong>
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reason: {req.reason}
                  </p>
                </div>
              </div>
              <RequestStatusPill status={req.status} />
            </div>
            <div className="flex gap-2 mt-3 ml-12">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => updateStatus(req.id, "accepted")}
                data-ocid={`emergency.accept.button.${i + 1}`}
              >
                <CheckCircle size={12} className="mr-1" /> Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
                onClick={() => updateStatus(req.id, "rejected")}
                data-ocid={`emergency.reject.button.${i + 1}`}
              >
                <XCircle size={12} className="mr-1" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Resolved Requests
          </h2>
          <div className="space-y-2">
            {resolved.map((req, i) => (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 flex items-center justify-between"
                data-ocid={`emergency.resolved.item.${i + 1}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-700">
                    {req.studentName}
                  </span>
                  <span className="text-xs text-orange-500 font-bold">
                    #{req.orderId}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {req.type.replace("_", " ")}
                  </span>
                </div>
                <RequestStatusPill status={req.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div
          className="py-12 text-center text-gray-400"
          data-ocid="emergency.empty_state"
        >
          No emergency requests at this time.
        </div>
      )}
    </div>
  );
}
