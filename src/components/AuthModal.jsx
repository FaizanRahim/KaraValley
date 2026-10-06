import { useState } from "react";
import { X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";
import { Button } from "./ui";

function nameFromEmail(email) {
  const local = email.split("@")[0].replace(/[._-]+/g, " ");
  return local.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AuthModal({ mode, initialRole, onClose, onSwitchMode, onSuccess }) {
  const ref = useDialog(true, onClose);
  const [role, setRole] = useState(initialRole || "client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [account, setAccount] = useState(null);

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (mode === "signup" && name.trim().length < 2) nextErrors.name = "Add the name you want on your profile.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (password.length < 8) nextErrors.password = "Use at least 8 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const nextUser = {
      name: mode === "signup" ? name.trim() : nameFromEmail(email.trim()),
      email: email.trim(),
      role,
    };
    setAccount(nextUser);
    onSuccess(nextUser);
    setDone(true);
  }

  const title = mode === "signup" ? "Create your account" : "Welcome back";

  return (
    <div
      className="overlay-fade fixed inset-0 z-[70] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="glass-strong modal-in max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-[28px] p-6 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{mode === "signup" ? "Sign up" : "Log in"}</p>
            <h2 id="auth-title" className="mt-2 font-display text-2xl font-semibold text-snow">
              {done ? "You’re in." : title}
            </h2>
          </div>
          <button type="button" className="icon-btn" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {done ? (
          <div className="mt-6">
            <p className="text-sm leading-relaxed text-mist">
              Signed in as {account.name}. This session stays in the browser tab — nothing is sent to a server.
            </p>
            <Button className="mt-6 w-full" onClick={onClose}>
              Continue
            </Button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
            <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {[
                ["client", "I want to hire"],
                ["freelancer", "I want to freelance"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={role === value}
                  className={`min-h-10 rounded-full px-2 text-xs font-semibold sm:text-sm ${
                    role === value ? "bg-white/10 text-snow" : "text-mist hover:text-snow"
                  }`}
                  onClick={() => setRole(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === "signup" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">Name</span>
                <input className="field" value={name} autoComplete="name" onChange={(event) => setName(event.target.value)} />
                {errors.name ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.name}</span> : null}
              </label>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">Email</span>
              <input
                className="field"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.email}</span> : null}
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-sm text-mist">
                Password
                <button type="button" className="text-xs text-mint hover:text-snow" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
              <input
                className="field"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.password}</span> : null}
            </label>

            <Button type="submit" className="w-full">
              {mode === "signup" ? "Create account" : "Log in"}
            </Button>

            <p className="text-center text-sm text-mist">
              {mode === "signup" ? "Already have an account?" : "New to KaraValley?"}{" "}
              <button
                type="button"
                className="font-semibold text-mint hover:text-snow"
                onClick={() => {
                  setErrors({});
                  setDone(false);
                  onSwitchMode(mode === "signup" ? "login" : "signup");
                }}
              >
                {mode === "signup" ? "Log in" : "Sign up"}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
