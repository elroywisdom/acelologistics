"use client";

import { useId, useState } from "react";
import type { FleetVehicle } from "@/content/home";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/Icons";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimePicker } from "@/components/booking/TimePicker";
import { clsx } from "@/lib/clsx";

/** The vehicle detail page's booking panel (Figma has no source for this —
 * built from the Shuttlers reference El-Roy shared on 2026-08-19, adapted
 * to Acelo's own "Hybrid Booking Funnel" plan already documented in the
 * project's kickoff brief: collect the booking as a structured form, then
 * hand off to WhatsApp + email rather than a self-serve checkout).
 *
 * Two steps — Rental Details, then User Details — mirroring the
 * reference's Step 1/2 → Step 2/2 pattern. On submit, POSTs to
 * `/api/bookings`, which emails the customer a confirmation and Acelo's
 * team an internal notification (see `lib/email.ts` for why email
 * replaces the reference's automated WhatsApp follow-up: no WhatsApp
 * Business API budget). The success modal swaps the reference's "Login
 * to Customer Web App" button for a WhatsApp CTA — Acelo has no customer
 * portal, and messaging the team directly is the actual next step. */
export function BookingForm({ vehicle }: { vehicle: FleetVehicle }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnEnabled, setReturnEnabled] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [layover, setLayover] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successWhatsappLink, setSuccessWhatsappLink] = useState<string | null>(null);

  const stepOneValid =
    pickupLocation.trim().length > 0 &&
    dropoffLocation.trim().length > 0 &&
    departureDate.length > 0 &&
    departureTime.length > 0 &&
    (!returnEnabled || (returnDate.length > 0 && returnTime.length > 0));

  const stepTwoValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    phoneLocal.trim().length > 0;

  async function handleSubmit() {
    if (!stepTwoValid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          pickupLocation,
          stops,
          dropoffLocation,
          departureDate,
          departureTime,
          returnEnabled,
          returnDate: returnEnabled ? returnDate : null,
          returnTime: returnEnabled ? returnTime : null,
          layover,
          vehicleCount,
          firstName,
          lastName,
          email,
          phone: `+234${phoneLocal.replace(/^0+/, "")}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setSuccessWhatsappLink(result.whatsappLink as string);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-white">
      {step === 1 ? (
        <RentalDetailsStep
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          stops={stops}
          setStops={setStops}
          dropoffLocation={dropoffLocation}
          setDropoffLocation={setDropoffLocation}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          departureTime={departureTime}
          setDepartureTime={setDepartureTime}
          returnEnabled={returnEnabled}
          setReturnEnabled={setReturnEnabled}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          returnTime={returnTime}
          setReturnTime={setReturnTime}
          layover={layover}
          setLayover={setLayover}
          vehicleCount={vehicleCount}
          setVehicleCount={setVehicleCount}
          canProceed={stepOneValid}
          onProceed={() => setStep(2)}
        />
      ) : (
        <UserDetailsStep
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phoneLocal={phoneLocal}
          setPhoneLocal={setPhoneLocal}
          submitting={submitting}
          submitError={submitError}
          canSubmit={stepTwoValid}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}

      {successWhatsappLink && (
        <SuccessModal
          whatsappLink={successWhatsappLink}
          onClose={() => setSuccessWhatsappLink(null)}
        />
      )}
    </div>
  );
}

const fieldClasses =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-[14px] text-ink placeholder:text-text-muted focus:border-primary focus:outline-none";
const labelClasses = "text-[13px] font-normal text-ink";

function RentalDetailsStep({
  pickupLocation,
  setPickupLocation,
  stops,
  setStops,
  dropoffLocation,
  setDropoffLocation,
  departureDate,
  setDepartureDate,
  departureTime,
  setDepartureTime,
  returnEnabled,
  setReturnEnabled,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
  layover,
  setLayover,
  vehicleCount,
  setVehicleCount,
  canProceed,
  onProceed,
}: {
  pickupLocation: string;
  setPickupLocation: (v: string) => void;
  stops: string[];
  setStops: (v: string[]) => void;
  dropoffLocation: string;
  setDropoffLocation: (v: string) => void;
  departureDate: string;
  setDepartureDate: (v: string) => void;
  departureTime: string;
  setDepartureTime: (v: string) => void;
  returnEnabled: boolean;
  setReturnEnabled: (v: boolean) => void;
  returnDate: string;
  setReturnDate: (v: string) => void;
  returnTime: string;
  setReturnTime: (v: string) => void;
  layover: boolean;
  setLayover: (v: boolean) => void;
  vehicleCount: number;
  setVehicleCount: (v: number) => void;
  canProceed: boolean;
  onProceed: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <h2 className="text-heading-3 font-normal text-ink">Rental Details</h2>
        <span className="text-[13px] font-normal text-success">Step 1/2</span>
      </div>

      <div className="flex flex-col gap-5 border-b border-border px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1 pt-3.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-success" />
            <span className="h-8 w-px border-l border-dashed border-border" aria-hidden />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {/* Plain text inputs for now (2026-08-19, El-Roy's call) — a
             * Google Places-backed autocomplete version of these three
             * fields was built and verified, but Places needs a Google
             * Cloud billing account (card on file) to unlock, which isn't
             * available right now. The autocomplete plumbing is still in
             * the repo (lib/places.ts, app/api/places/autocomplete/,
             * components/booking/LocationAutocompleteInput.tsx) and
             * degrades to exactly this same plain-input behavior on its
             * own whenever GOOGLE_PLACES_API_KEY isn't set — so swapping
             * back in later is a one-line change per field (see that
             * component's usage in this file's git history) once a card
             * is available, no rebuild needed. */}
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Pick Up Location"
              className={fieldClasses}
            />
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => {
                    const next = [...stops];
                    next[i] = e.target.value;
                    setStops(next);
                  }}
                  placeholder={`Stop ${i + 1}`}
                  className={fieldClasses}
                />
                <button
                  type="button"
                  aria-label={`Remove stop ${i + 1}`}
                  onClick={() => setStops(stops.filter((_, idx) => idx !== i))}
                  className="tap-target flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text-muted hover:bg-surface-alt hover:text-ink"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Where to?"
              className={fieldClasses}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStops([...stops, ""])}
          className="tap-target flex w-fit items-center gap-1.5 self-end rounded-pill bg-tint-blue-100 px-3 py-1.5 text-[13px] font-normal text-primary hover:bg-tint-blue-200"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add Stop
        </button>
      </div>

      <div className="flex flex-col gap-5 border-b border-border px-6 py-5">
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={setDepartureDate}
          />
          <TimePicker
            label="Departure Time"
            value={departureTime}
            onChange={setDepartureTime}
          />
        </div>

        <ToggleRow
          label="Enable return trip"
          description="Would you like to return with our shuttle?"
          checked={returnEnabled}
          onChange={setReturnEnabled}
        />

        {returnEnabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Return Date"
                value={returnDate}
                onChange={setReturnDate}
                minDate={departureDate}
              />
              <TimePicker
                label="Return Time"
                value={returnTime}
                onChange={setReturnTime}
              />
            </div>
            <ToggleRow
              label="Lay over"
              description="Would you require the vehicle to stay at the location with you till the return date?"
              checked={layover}
              onChange={setLayover}
            />
          </>
        )}

        <div className="flex items-center justify-between">
          <span className={labelClasses}>Number of vehicle(s)</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Decrease number of vehicles"
              disabled={vehicleCount <= 1}
              onClick={() => setVehicleCount(Math.max(1, vehicleCount - 1))}
              className="tap-target flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-ink disabled:opacity-40"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-4 text-center text-[15px] text-ink">{vehicleCount}</span>
            <button
              type="button"
              aria-label="Increase number of vehicles"
              onClick={() => setVehicleCount(Math.min(20, vehicleCount + 1))}
              className="tap-target flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <Button
          type="button"
          disabled={!canProceed}
          onClick={onProceed}
          className="w-full disabled:cursor-not-allowed disabled:bg-border disabled:text-text-muted"
        >
          Proceed
        </Button>
      </div>
    </>
  );
}

function UserDetailsStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneLocal,
  setPhoneLocal,
  submitting,
  submitError,
  canSubmit,
  onBack,
  onSubmit,
}: {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phoneLocal: string;
  setPhoneLocal: (v: string) => void;
  submitting: boolean;
  submitError: string | null;
  canSubmit: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          className="tap-target flex items-center gap-2 text-[15px] font-normal text-ink hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          User Details
        </button>
        <span className="text-[13px] font-normal text-success">Step 2/2</span>
      </div>

      <form
        className="flex flex-col gap-5 px-6 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={fieldClasses}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={fieldClasses}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClasses} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className={fieldClasses}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClasses} htmlFor="phone">
            Phone Number
          </label>
          <div className="flex overflow-hidden rounded-md border border-border focus-within:border-primary">
            <span className="flex items-center border-r border-border bg-surface-alt px-3 text-[14px] text-text-muted">
              +234
            </span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={phoneLocal}
              onChange={(e) => setPhoneLocal(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="810 311 5430"
              className="w-full px-4 py-3 text-[14px] text-ink placeholder:text-text-muted focus:outline-none"
              required
            />
          </div>
        </div>

        {submitError && (
          <p role="alert" className="text-[13px] text-error">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          variant="accent"
          disabled={!canSubmit || submitting}
          className="w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Book Now"}
        </Button>
      </form>
    </>
  );
}


function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-normal text-ink">{label}</span>
        <span className="text-[13px] text-text-muted">{description}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={clsx(
          "tap-target relative h-6 w-11 shrink-0 rounded-pill transition-colors",
          checked ? "bg-success" : "bg-border",
        )}
      >
        <span
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{
            transform: checked ? "translateX(20px)" : "translateX(0)",
            transition: "transform 150ms ease",
          }}
        />
      </button>
    </div>
  );
}

function SuccessModal({ whatsappLink, onClose }: { whatsappLink: string; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-success-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 backdrop-blur-xs"
    >
      <div className="flex w-full max-w-[420px] flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-2xl">
        <CheckCircleIcon className="h-14 w-14 text-success" />
        <h3 id="booking-success-heading" className="text-heading-3 font-semibold text-ink">
          Reservation Request Received!
        </h3>
        <p className="text-[14px] leading-relaxed text-text-muted">
          Thank you for choosing Acelo Logistics. We have sent a confirmation email to your inbox.
          You can also message our dispatch team directly on WhatsApp to finalize your trip details.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 border-t border-border pt-4">
          <Button variant="whatsapp" href={whatsappLink} target="_blank" className="w-full">
            Message Acelo HQ on WhatsApp
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="tap-target py-2 text-[14px] font-normal text-text-muted transition-colors hover:text-ink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
