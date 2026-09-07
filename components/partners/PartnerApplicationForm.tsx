"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/Icons";
import {
  AVAILABILITY_OPTIONS,
  DRIVER_ARRANGEMENTS,
  PAPER_STATUSES,
  VEHICLE_CLASSES,
  VEHICLE_CONDITIONS,
} from "@/lib/partner-application";
import { clsx } from "@/lib/clsx";

/** Fleet partner application form. Two steps — Vehicle, then Owner —
 * mirroring `components/booking/BookingForm.tsx` so the two flows on this
 * site behave identically: same field styling, same step header, same
 * success modal handing over to WhatsApp.
 *
 * The vehicle step is first on purpose. It is the part that decides
 * whether there is an application at all, and asking for a stranger's
 * phone number before they know they qualify is the standard way to lose
 * them. */

const fieldClasses =
  "w-full rounded-sm border border-border bg-white px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-text-muted focus:border-primary";

const labelClasses = "text-[13px] text-text-muted";

export function PartnerApplicationForm() {
  const id = useId();
  const [step, setStep] = useState<1 | 2>(1);

  const [vehicleClass, setVehicleClass] = useState<string>(VEHICLE_CLASSES[0]);
  const [makeModel, setMakeModel] = useState("");
  const [year, setYear] = useState("");
  const [vehicleCount, setVehicleCount] = useState(1);
  const [condition, setCondition] = useState<string>(VEHICLE_CONDITIONS[0]);
  const [papers, setPapers] = useState<string>(PAPER_STATUSES[0]);
  const [driverArrangement, setDriverArrangement] = useState<string>(DRIVER_ARRANGEMENTS[0]);
  const [availability, setAvailability] = useState<string>(AVAILABILITY_OPTIONS[0]);

  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successLink, setSuccessLink] = useState<string | null>(null);

  const stepOneValid = makeModel.trim().length > 0 && year.trim().length > 0;
  const stepTwoValid =
    city.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phoneLocal.trim().length >= 7;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stepTwoValid || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleClass,
          makeModel,
          year,
          vehicleCount,
          condition,
          papers,
          driverArrangement,
          availability,
          city,
          firstName,
          lastName,
          email,
          phone: `+234${phoneLocal.replace(/^0+/, "")}`,
          notes,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccessLink(result.whatsappLink);
    } catch {
      setSubmitError("Could not reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successLink) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-white p-8 text-center">
        <CheckCircleIcon className="h-12 w-12 text-success" aria-hidden />
        <h2 className="text-heading-2 font-normal text-ink">Application received</h2>
        <p className="max-w-[420px] text-[15px] leading-[1.6] text-text-muted">
          Your vehicle details are with the Acelo fleet team, and a copy is on
          its way to {email}. The next step is vetting — send the message below
          and dispatch can start on it straight away.
        </p>
        <Button
          variant="whatsapp"
          href={successLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill px-6 py-3.5"
        >
          Continue on WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-white"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <h2 className="text-heading-3 font-normal text-ink">
          {step === 1 ? "Your vehicle" : "Your details"}
        </h2>
        <span className="text-[13px] font-normal text-success">Step {step}/2</span>
      </div>

      {step === 1 ? (
        <div className="flex flex-col gap-5 px-6 py-6">
          <div className="flex flex-col gap-2">
            <label className={labelClasses} htmlFor={`${id}-class`}>
              Vehicle class
            </label>
            <select
              id={`${id}-class`}
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              className={fieldClasses}
            >
              {VEHICLE_CLASSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor={`${id}-model`}>
                Make and model
              </label>
              <input
                id={`${id}-model`}
                type="text"
                value={makeModel}
                onChange={(e) => setMakeModel(e.target.value)}
                placeholder="e.g. Toyota Coaster"
                className={fieldClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor={`${id}-year`}>
                Year
              </label>
              <input
                id={`${id}-year`}
                type="text"
                inputMode="numeric"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2018"
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className={labelClasses}>How many of this vehicle?</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Fewer vehicles"
                onClick={() => setVehicleCount((c) => Math.max(1, c - 1))}
                className="tap-target flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink hover:bg-surface-alt"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span aria-live="polite" className="w-6 text-center text-[15px] text-ink">
                {vehicleCount}
              </span>
              <button
                type="button"
                aria-label="More vehicles"
                onClick={() => setVehicleCount((c) => c + 1)}
                className="tap-target flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink hover:bg-surface-alt"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {[
            { label: "Condition", value: condition, set: setCondition, options: VEHICLE_CONDITIONS, key: "condition" },
            { label: "Papers and insurance", value: papers, set: setPapers, options: PAPER_STATUSES, key: "papers" },
            { label: "Driver", value: driverArrangement, set: setDriverArrangement, options: DRIVER_ARRANGEMENTS, key: "driver" },
            { label: "Availability", value: availability, set: setAvailability, options: AVAILABILITY_OPTIONS, key: "availability" },
          ].map((field) => (
            <div key={field.key} className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor={`${id}-${field.key}`}>
                {field.label}
              </label>
              <select
                id={`${id}-${field.key}`}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className={fieldClasses}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <p className="text-[13px] leading-[1.5] text-text-muted">
            No documents needed yet. Acelo asks for the vehicle papers,
            insurance and driver&rsquo;s licence during vetting, on WhatsApp.
          </p>

          <Button
            type="button"
            onClick={() => setStep(2)}
            className={clsx("w-full justify-center py-3.5", !stepOneValid && "pointer-events-none opacity-50")}
          >
            Continue
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-6 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor={`${id}-first`}>
                First name
              </label>
              <input
                id={`${id}-first`}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={fieldClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor={`${id}-last`}>
                Last name
              </label>
              <input
                id={`${id}-last`}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClasses} htmlFor={`${id}-city`}>
              City you operate from
            </label>
            <input
              id={`${id}-city`}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Abuja"
              className={fieldClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClasses} htmlFor={`${id}-email`}>
              Email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={fieldClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClasses} htmlFor={`${id}-phone`}>
              Phone
            </label>
            <div className="flex items-center gap-2">
              <span className="rounded-sm border border-border px-3 py-3 text-[14px] text-text-muted">
                +234
              </span>
              <input
                id={`${id}-phone`}
                type="tel"
                inputMode="numeric"
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="8103115430"
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClasses} htmlFor={`${id}-notes`}>
              Anything else? <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              id={`${id}-notes`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Other vehicles you own, routes you already run, when you can be inspected."
              className={clsx(fieldClasses, "resize-y")}
            />
          </div>

          {submitError && (
            <p role="alert" className="text-[13px] text-error">
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="justify-center py-3.5 sm:w-auto"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden />
              Back
            </Button>
            <Button
              type="submit"
              className={clsx(
                "flex-1 justify-center py-3.5",
                (!stepTwoValid || submitting) && "pointer-events-none opacity-50",
              )}
            >
              {submitting ? "Sending…" : "Submit application"}
            </Button>
          </div>

          <p className="text-[12px] leading-[1.5] text-text-muted">
            Acelo uses these details to assess your vehicle and contact you
            about vetting. Nothing is shared with anyone else.
          </p>
        </div>
      )}
    </form>
  );
}
